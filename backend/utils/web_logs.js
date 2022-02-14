//import discord-webhook-node
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const dotenv = require('dotenv')
dotenv.config()

const hook = new Webhook({url: process.env.WEBHOOK, throwErrors: false,retryOnLimit: false});
hook.setUsername('Callums Github Bot');

module.exports.web_logs = {
    hook,
    Webhook,
    MessageBuilder
}