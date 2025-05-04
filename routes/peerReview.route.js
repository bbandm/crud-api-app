const express = require('express');
const router = express.Router();
const PeerReview = require('../models/peerReview.model');
const { createPeerReview, deletePeerReview, getPeerReview, updatePeerReview } = require('../controllers/peerReview.controller');


router.post('/', createPeerReview);
router.delete('/:id', deletePeerReview);
router.get('/:memberId', getPeerReview);
router.patch('/:id', updatePeerReview);

module.exports = router;