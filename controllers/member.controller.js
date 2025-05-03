const Member = require('../models/member.model');

const createMember = async (req, res) => {
    try {
        const member = await Member.create(req.body)
        res.status(201).json({
            message : "회원이 성공적으로 등록되었습니다",
            path: req.originalUrl,
            timestamp : new Date().toISOString(),
            data: member
        })
    } catch (error) {
        res.status(400).json({
            message: "잘못된 요청입니다.",
            path: req.originalUrl,
            timestamp: new Date().toISOString(),
            error: error.message
        })
    }
}

const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;

        const member = await Member.findByIdAndDelete(id);

        if (!member) {
            return res.status(404).json({ message: '회원을 찾을 수 없습니다' });
        }
        res.status(204).json({ message : "회원이 성공적으로 삭제되었습니다"})
    } catch (error) {
        res.status(400).json({ 
            message: "잘못된 요청입니다.",
            path: req.originalUrl,
            timestamp: new Date().toISOString(),
            error: error.message
        })
    }
}

const getMember = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: '회원을 찾을 수 없습니다' });
        }
        res.status(200).json({
            messaage : "회원 목록이 성공적으로 조회되었습니다",
            data: member
        });
    } catch (error) {
        res.status(400).json({
            message: "잘못된 요청입니다.",
            path: req.originalUrl,
            timestamp: new Date().toISOString(),
            error: error.message
        })
    }
}

const getMembers = async (req, res) => {
    try {
        const {teamName} = req.query;

        let query = {};

        if (teamName) {
            query = { teamName: teamName };
        }

        const members = await Member.find(query).sort({ createdAt: -1 });
        res.status(200).json({
            message : "회원 목록이 성공적으로 조회되었습니다",
            data: members
        });
    } catch (error) {
        res.status(400).json({
            message: "잘못된 요청입니다.",
            path: req.originalUrl,
            timestamp: new Date().toISOString(),
            error: error.message
        })
    }
}

module.exports = {
    createMember,
    deleteMember,
    getMember,
    getMembers,
}