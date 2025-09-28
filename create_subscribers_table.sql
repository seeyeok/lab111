-- Create subscribers table for the opt-in form
-- Compatible with PostgreSQL/Supabase

CREATE TABLE subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    consent BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    subscription_source VARCHAR(100) DEFAULT 'website_optin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_active ON subscribers(is_active);
CREATE INDEX idx_subscribers_created_at ON subscribers(created_at);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on row updates
CREATE TRIGGER update_subscribers_updated_at
    BEFORE UPDATE ON subscribers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments to document the table structure
COMMENT ON TABLE subscribers IS 'Stores newsletter subscribers from the opt-in form';
COMMENT ON COLUMN subscribers.id IS 'Unique identifier for each subscriber';
COMMENT ON COLUMN subscribers.name IS 'Full name provided by the subscriber';
COMMENT ON COLUMN subscribers.email IS 'Email address (unique per subscriber)';
COMMENT ON COLUMN subscribers.consent IS 'Whether user has given consent to receive emails';
COMMENT ON COLUMN subscribers.is_active IS 'Whether the subscription is currently active';
COMMENT ON COLUMN subscribers.subscription_source IS 'Source of the subscription (website_optin, etc.)';
COMMENT ON COLUMN subscribers.created_at IS 'Timestamp when the subscription was created';
COMMENT ON COLUMN subscribers.updated_at IS 'Timestamp when the record was last updated';