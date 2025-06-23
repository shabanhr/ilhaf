'use client';

import { ORDivider } from './or-divider';
import { LoginWithEmail } from './login-with-email';
import { LoginWithGoogle } from './login-with-google';

const Signin = () => {
	return (
		<div>
			<LoginWithGoogle />
			<ORDivider />
			<LoginWithEmail />
		</div>
	);
};
export default Signin;
