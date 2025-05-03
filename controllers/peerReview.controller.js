const PeerReview = require('../models/peerReview.model');

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
        res.status(201).json({
            message : "상호평가가 성공적으로 등록되었습니다",
            path: req.originalUrl,
            timestamp : new Date().toISOString(),
            data: newPeerReview
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

        const peerReview = await PeerReview.findByIdAndDelete(id);

        if (!peerReview) {
            return res.status(404).json({ message: '상호평가를 찾을 수 없습니다' });
        }
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
        const peerReview = await PeerReview.findById({revieweeId : memeberId})
            .populate('reviewerId', 'name tel clubNum teamName')
            .populate('revieweeId', 'name tel clubNum teamName');

        if (!peerReview) {
            return res.status(404).json({ message: '상호평가를 찾을 수 없습니다' });
        }
        res.status(200).json({
            message: "상호평가 목록이 성공적으로 조회되었습니다",
            data: peerReview
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
        const peerReview = await PeerReview.findByIdAndUpdate(id, req.body, { new: true });
        if (!peerReview) {
            return res.status(404).json({ message: '상호평가를 찾을 수 없습니다' });
        }
        res.status(200).json({
            message : "상호평가가 성공적으로 수정되었습니다",
            data : peerReview
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
