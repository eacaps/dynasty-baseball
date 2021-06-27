// const express = require('express');
import express from 'express';

const router = express.Router();
// const backend = require('./roster/object-roster-backend');
import backend from './roster/object-roster-backend.js';

router.get('/league/:league_id/team/:team_id/roster/:rev_id?', function(req, res){
    const {league_id,team_id,rev_id} = req.params;
    const json = backend.get(team_id,rev_id);
    res.json(json)
 });

 router.post('/league/:league_id/team/:team_id/roster/:rev_id', function(req, res){
    const {league_id,team_id,rev_id} = req.params;
    const body = req.body;
    console.log(`body: ${JSON.stringify(body)}`);
    backend.put(team_id,rev_id,body);
    res.json({success:true})
 });

//Routes will go here
// module.exports = router;
export default router;