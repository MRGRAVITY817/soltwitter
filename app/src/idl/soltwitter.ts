export type Soltwitter = {
  "version": "0.1.0",
  "name": "soltwitter",
  "instructions": [
    {
      "name": "sendTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "topic",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "topic",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "tweet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "topic",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TopicTooLong",
      "msg": "Topic per tweet should be less or equal than 50 chars."
    },
    {
      "code": 6001,
      "name": "ContentTooLong",
      "msg": "Content per tweet should be less or equal than 280 chars."
    }
  ]
};

export const IDL: Soltwitter = {
  "version": "0.1.0",
  "name": "soltwitter",
  "instructions": [
    {
      "name": "sendTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "topic",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "topic",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteTweet",
      "accounts": [
        {
          "name": "tweet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "tweet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "topic",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TopicTooLong",
      "msg": "Topic per tweet should be less or equal than 50 chars."
    },
    {
      "code": 6001,
      "name": "ContentTooLong",
      "msg": "Content per tweet should be less or equal than 280 chars."
    }
  ]
};
