use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod soltwitter {
    use anchor_lang::solana_program::entrypoint::ProgramResult;

    use super::*;
    pub fn send_tweet(ctx: Context<SendTweet>, topic: String, content: String) -> ProgramResult {
        let tweet: &mut Account<Tweet> = &mut ctx.accounts.tweet;
        let author: &Signer = &ctx.accounts.author;
        // This provides network time of Solana.
        let clock = Clock::get()?;

        tweet.author = *author.key;
        tweet.timestamp = clock.unix_timestamp;
        tweet.topic = topic;
        tweet.content = content;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SendTweet<'info> {
    #[account(init, payer = author, space = Tweet::LEN)]
    pub tweet: Account<'info, Tweet>,
    #[account(mut)] // This is set to `mut` since we will change `author`'s lamport balance.
    pub author: Signer<'info>, // we have to know who is sending the tweet
    pub system_program: Program<'info, System>, // we should provide system program that'll create `Tweet` account
}

#[account]
pub struct Tweet {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
}

impl Tweet {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH
        + TIMESTAMP_LENGTH
        + (STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH)
        + (STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH);
}

/// Discriminator saves the info about this account. The info size is 8bytes
const DISCRIMINATOR_LENGTH: usize = 8;
/// Solana public keys are 32 bytes long - `[u8; 32]`
const PUBLIC_KEY_LENGTH: usize = 32;
/// i64 -> 8 bytes
const TIMESTAMP_LENGTH: usize = 8;
/// `String` type includes also a prefix that saves the length info of the content - because it's a smart pointer.
const STRING_LENGTH_PREFIX: usize = 4;
/// An UTF-8 char takes maximum 4 bytes.
const UTF_CHAR_LENGTH: usize = 4;
/// We'll let user to type max 50 chars for a topic.
const MAX_TOPIC_LENGTH: usize = UTF_CHAR_LENGTH * 50;
/// We'll let user to type max 280 chars for single content.
const MAX_CONTENT_LENGTH: usize = UTF_CHAR_LENGTH * 280;
