import React from 'react';

import '../../sass/app.sass';
import './Layout.sass';

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return <main>{children}</main>;
};

