const express = require('express');
const router = express.Router();
const PeerReview = require('../models/peerReview.model');
const { createPeerReview, deletePeerReview, getPeerReview, updatePeerReview } = require('../controllers/peerReview.controller');

/**
 * @swagger
 * tags:
 *  name: PeerReviews
 *  description: 상호평가 API
 */

/**
 * @swagger
 * /api/peer-reviews:
 *   post:
 *     summary: 상호평가 등록
 *     tags: [PeerReviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reviewerId
 *               - revieweeId
 *               - password
 *               - rating
 *               - content
 *             properties:
 *               reviewerId:
 *                 type: string
 *                 description: 평가자 회원 ID
 *               revieweeId:
 *                 type: string
 *                 description: 평가받는 회원 ID
 *               password:
 *                 type: string
 *                 description: 평가 비밀번호
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: 평가 점수
 *               content:
 *                 type: string
 *                 description: 평가 내용
 *     responses:
 *       201:
 *         description: 상호평가 등록 성공
 *       400:
 *         description: 잘못된 요청
 */
router.post('/', createPeerReview);

/**
 * @swagger
 * /api/peer-reviews/{id}:
 *   delete:
 *     summary: 상호평가 삭제
 *     tags: [PeerReviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 평가 ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: 평가 비밀번호
 *     responses:
 *       204:
 *         description: 삭제 성공
 *       400:
 *         description: 비밀번호 불일치 또는 잘못된 요청
 *       404:
 *         description: 평가를 찾을 수 없음
 */
router.delete('/:id', deletePeerReview);

/**
 * @swagger
 * /api/peer-reviews/{memberId}:
 *   get:
 *     summary: 특정 회원의 상호평가 조회
 *     tags: [PeerReviews]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         description: 평가받는 회원 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 상호평가 목록 조회 성공
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 상호평가를 찾을 수 없음
 */
router.get('/:memberId', getPeerReview);

/**
 * @swagger
 * /api/peer-reviews/{id}:
 *   patch:
 *     summary: 상호평가 수정
 *     tags: [PeerReviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 평가 ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: 수정 권한 확인용 비밀번호
 *               rating:
 *                 type: integer
 *                 description: 새로운 평가 점수 (선택)
 *               content:
 *                 type: string
 *                 description: 새로운 평가 내용 (선택)
 *     responses:
 *       200:
 *         description: 수정 성공
 *       400:
 *         description: 비밀번호 불일치 또는 잘못된 요청
 *       404:
 *         description: 평가를 찾을 수 없음
 */
router.patch('/:id', updatePeerReview);

module.exports = router;