const PeerReview = require('../models/peerReview.model');
const mongoose = require('mongoose');

const createPeerReview = async (req, res) => {
    try {
        const { reviewerId, revieweeId, password, rating, content } = req.body;

        if (!mongoose.Types.ObjectId.isValid(reviewerId) || !mongoose.Types.ObjectId.isValid(revieweeId)) {
            return res.status(400).json({ message: '유효하지 않은 회원 ID입니다.' });
        }
        const newPeerReview = await PeerReview.create({
            reviewerId,
            revieweeId,
            password,
            rating,
            content,
        });

        const responseData = { ...newPeerReview.toObject() };
        delete responseData.password;

        res.status(201).json({
            message : "상호평가가 성공적으로 등록되었습니다",
            path: req.originalUrl,
            timestamp : new Date().toISOString(),
            data: responseData
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

const deletePeerReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const peerReview = await PeerReview.findById(id);
        if (!peerReview) {
            return res.status(404).json({ message: '상호평가를 찾을 수 없습니다' });
        }
        if (peerReview.password !== password){
            return res.status(400).json({ message: '비밀번호가 일치하지 않습니다'})
        }

        const deletedPeerReview = await PeerReview.findByIdAndDelete(id);

        res.status(204).json({ message: '상호평가가 성공적으로 삭제되었습니다' });
    } catch (error) {
        res.status(400).json({
            message: "잘못된 요청입니다.",
            path: req.originalUrl,
            timestamp: new Date().toISOString(),
            error: error.message
        })
    }
}

const getPeerReview = async (req, res) => {
    try {
        const { memberId } = req.params;
        const peerReview = await PeerReview.find({revieweeId : memberId})
            .populate('reviewerId', 'name tel clubNum teamName')
            .populate('revieweeId', 'name tel clubNum teamName');

        if (!peerReview) {
            return res.status(404).json({ message: '상호평가를 찾을 수 없습니다' });
        }

        const responseData = peerReview.map(review => {
            const reviewObject = review.toObject();
            delete reviewObject.password;
            return reviewObject;
        });

        res.status(200).json({
            message: "상호평가 목록이 성공적으로 조회되었습니다",
            data: responseData
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

const updatePeerReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, ...updateData } = req.body;
        const peerReview = await PeerReview.findById(id);
        if (!peerReview) {
            return res.status(404).json({ message: '상호평가를 찾을 수 없습니다' });
        }
        if (peerReview.password !== password){
            return res.status(400).json({ message: '비밀번호가 일치하지 않습니다'})
        }
        const updatedPeerReview = await PeerReview.findByIdAndUpdate(id, updateData, { new: true });

        const responseData = { ...updatedPeerReview.toObject() };
        delete responseData.password;

        res.status(200).json({
            message : "상호평가가 성공적으로 수정되었습니다",
            data : responseData
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
    createPeerReview,
    deletePeerReview,
    getPeerReview,
    updatePeerReview
}
