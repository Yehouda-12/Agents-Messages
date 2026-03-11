import Report from '../models/Report.js';
import { Readable } from 'stream';
import csv from 'csv-parser'
import User from '../models/User.js';




export const importReportsCsv = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file csv found' })

        const results = []

        const stream = Readable.from(req.file.buffer.toString())

        stream
            .pipe(csv(['category', 'urgency', 'message']))
            .on('data', (data) => {
                if (data.category.toLowerCase() !== 'category') {
                    results.push({
                        userId: req.user._id,
                        category: data.category.trim(),
                        urgency: data.urgency.trim(),
                        message: data.message.trim(),
                        sourceType: 'csv'
                    });
                }

            })
            .on('end', async () => {
                if (results.length === 0) {
                    return res.status(400).json({ message: "CSV EMPTY OR NOT GOOD FORMAT" });
                }
                await Report.insertMany(results);
                res.status(201).json({ message: `${results.length} Report imported!` });
            });
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

export const getReportById = async (req, res) => {
    try {
        const { id } = req.params
        const { role, _id: userId } = req.user

        const report = await Report.findById(id)
            .populate('userId', 'fullName agentCode')

        if (!report) {
            return res.status(404).json({ message: "Report not found" })
        }

        if (role === 'agent' && report.userId._id.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'not authrized to view this report' })
        }
        res.status(200).json(report)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }

}

export const getReports = async (req, res) => {
    try {
        let query = {}
        const { role, _id } = req.user
        const { category, urgency, agentCode, userId } = req.query;

        if (role === 'agent') {
            query.userId = _id
        }
        if (userId) query.userId = userId

        if (category) query.category = category
        if (urgency) query.urgency = urgency

        if (agentCode) {
            const agent = await User.findOne({ agentCode })
            if (!agent) return res.status(200).json([])
            query.userId = agent._id
        }


        const reports = await Report.find(query)
            .populate('userId', 'fullName agentCode')
            .sort({ createdAt: -1 });


        res.status(200).json(reports)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createReport = async (req, res) => {
    try {
        const { category, urgency, message } = req.body;


        if (!category || !urgency || !message) {
            return res.status(400).json({ message: "field category, urgency , message must be given." });
        }

        const newReport = new Report({
            userId: req.user._id,
            category,
            urgency,
            message,
            imagePath: req.file ? `src/uploads/${req.file.filename}` : null,
            sourceType: 'manual',
            createdAt: new Date()
        });

        await newReport.save();


        res.status(201).json({
            message: "Report created",
            report: {
                id: newReport._id,
                userId: newReport.userId,
                category: newReport.category,
                urgency: newReport.urgency,
                message: newReport.message,
                imagePath: newReport.imagePath,
                sourceType: newReport.sourceType,
                createdAt: newReport.createdAt
            }
        });

    } catch (error) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({ message: "Max 5MB" });
        }
        res.status(500).json({ message: error.message });
    }
}