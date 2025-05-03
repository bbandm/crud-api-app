const express = require('express');
const router = express.Router();
const Member = require('../models/member.model');
const { createMember, deleteMember, getMember, getMembers } = require('../controllers/member.controller');

router.post('/', createMember);
router.delete('/:id', deleteMember);
router.get('/:id', getMember);
router.get('/', getMembers);

module.exports = router;