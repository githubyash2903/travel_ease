import { Migration } from "../../migrate";


export const contactMessagesTable: Migration = {
  id: 11,
  name: 'contact_messages',
  up: `
    CREATE TABLE IF NOT EXISTS contact_messages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

      user_id UUID REFERENCES users(id) ON DELETE SET NULL,

      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,

      subject TEXT NOT NULL,
      message TEXT NOT NULL,

      is_read BOOLEAN NOT NULL DEFAULT FALSE,

      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
      ON contact_messages(created_at DESC);

    CREATE INDEX IF NOT EXISTS idx_contact_messages_user_id
      ON contact_messages(user_id);
  `,
};
