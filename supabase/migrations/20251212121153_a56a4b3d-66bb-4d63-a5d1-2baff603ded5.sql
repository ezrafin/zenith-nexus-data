-- Fix CHECK constraint to allow ratings 0-100 (UI uses 0-100 scale)
ALTER TABLE company_evaluations 
DROP CONSTRAINT IF EXISTS company_evaluations_rating_check;

ALTER TABLE company_evaluations 
ADD CONSTRAINT company_evaluations_rating_check 
CHECK ((rating >= 0) AND (rating <= 100));