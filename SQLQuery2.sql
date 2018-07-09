create table chat(
[userMail] VARCHAR (100) NOT NULL,
[groupId]  INT          NOT NULL,
[text] varchar(255),
[date] date,
PRIMARY KEY CLUSTERED ([userMail] ASC,[groupId] ASC),
FOREIGN KEY ([userMail]) REFERENCES [dbo].[Users] ([mail]),
FOREIGN KEY ([groupId]) REFERENCES [dbo].[Groups] ([id])
)