"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react"
import { Toaster } from "./ui/sonner";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: Omit<ThemeProviderProps, 'children'>;
}

export function Providers({ children, themeProps }: ProvidersProps) {

	return (
		<NextThemesProvider {...themeProps}>
			<SessionProvider>

				{children}
				<Toaster
					position="bottom-left"
				/>
			</SessionProvider>
		</NextThemesProvider>
	);
}
