-- Make rppoultry25@gmail.com an admin user
INSERT INTO public.user_roles (user_id, role)
VALUES ('a792f25d-0e27-4334-80e8-91b2b9fea231', 'admin'::public.app_role)
ON CONFLICT (user_id, role) DO NOTHING;