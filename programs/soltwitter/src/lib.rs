use anchor_lang::prelude::*;

declare_id!("H3tP4URvzTw9iow9aPynthyzSwGGoZLbXt34LVbhDE66");

#[program]
pub mod soltwitter {
    use super::*;

    pub fn send_tweet(ctx: Context<SendTweet>, topic: String, content: String) -> Result<()> {
        let tweet: &mut Account<Tweet> = &mut ctx.accounts.tweet;
        let author: &Signer = &ctx.accounts.author;
        // This provides network time of Solana.
        let clock = Clock::get()?;

        if topic.chars().count() > 50 {
            return Err(TweetError::TopicTooLong.into());
        }
        if content.chars().count() > 280 {
            return Err(TweetError::ContentTooLong.into());
        }

        tweet.author = *author.key;
        tweet.timestamp = clock.unix_timestamp;
        tweet.topic = topic;
        tweet.content = content;

        Ok(())
    }

    pub fn update_tweet(ctx: Context<UpdateTweet>, topic: String, content: String) -> Result<()> {
        let tweet: &mut Account<Tweet> = &mut ctx.accounts.tweet;
        if topic.chars().count() > 50 {
            return Err(TweetError::TopicTooLong.into());
        }
        if content.chars().count() > 280 {
            return Err(TweetError::ContentTooLong.into());
        }

        tweet.topic = topic;
        tweet.content = content;

        Ok(())
    }
}

#[error_code]
pub enum TweetError {
    #[msg("Topic per tweet should be less or equal than 50 chars.")]
    TopicTooLong,
    #[msg("Content per tweet should be less or equal than 280 chars.")]
    ContentTooLong,
}

// Instructions need to derive `Accounts` trait.
#[derive(Accounts)]
pub struct SendTweet<'info> {
    #[account(init, payer = author, space = Tweet::LEN)]
    pub tweet: Account<'info, Tweet>,
    #[account(mut)] // This is set to `mut` since we will change `author`'s lamport balance.
    pub author: Signer<'info>, // we have to know who is sending the tweet
    pub system_program: Program<'info, System>, // we should provide system program that'll create `Tweet` account, also to use Clock.
}

#[derive(Accounts)]
pub struct UpdateTweet<'info> {
    #[account(mut, has_one = author)]
    pub tweet: Account<'info, Tweet>,
    pub author: Signer<'info>,
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
