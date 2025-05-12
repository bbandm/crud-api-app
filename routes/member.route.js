const express = require('express');
const router = express.Router();
const Member = require('../models/member.model');
const { createMember, deleteMember, getMember, getMembers } = require('../controllers/member.controller');

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: 회원 API
 */

/**
 * @swagger
 * /api/members:
 *   post:
 *     summary: 회원 생성
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - tel
 *               - clubNum
 *               - teamName
 *             properties:
 *               name:
 *                 type: string
 *                 description: 이름
 *               tel:
 *                 type: string
 *                 description: 전화번호
 *               clubNum:
 *                  type: number
 *                  description: 기수
 *               teamName:
 *                  type: string
 *                  description: 소속 팀  
 *     responses:
 *       201:
 *         description: 회원 등록 성공
 *       400:
 *         description: 잘못된 요청
 */
router.post('/', createMember);

/**
 * @swagger
 * /api/members/{id}:
 *   delete:
 *     summary: 회원 삭제
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 회원 ID
 *     responses:
 *       204:
 *         description: 회원 삭제 성공
 *       400:
 *         description: 잘못된 요청
 */
router.delete('/:id', deleteMember);

/**
 * @swagger
 * /api/members/{id}:
 *   get:
 *     summary: 특정 회원 조회
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 회원 ID
 *     responses:
 *       200:
 *         description: 회원 조회 성공
 *       400:
 *         description: 잘못된 요청
 */
router.get('/:id', getMember);

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: 전체 회원 목록 조회
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: 회원 목록 조회 성공
 *       400:
 *        description: 잘못된 요청
 */
router.get('/', getMembers);

module.exports = router;