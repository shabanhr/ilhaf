import { Body, Container, Head, Heading, Html, Img, Preview, Section, Tailwind } from '@react-email/components';
import { Footer } from './footer';
import { siteName } from '@/config';
import { siteLink } from '@/config';

interface Props {
	children: React.ReactNode;
	preview: string;
	heading?: string;
	showWordmark?: boolean;
}

export function EmailTemplate({ children, preview, heading, showWordmark = true }: Props) {
	return (
		<Html>
			<Head />
			<Preview>{preview}</Preview>
			<Tailwind>
				<Body className="mx-auto my-auto bg-white font-sans">
					<Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-neutral-200 px-10 py-5">
						{showWordmark && (
							<Section className="mt-8">
								<Img src={`${siteLink}/logo.png`} height="40" alt={siteName} className="mx-auto my-0" />
							</Section>
						)}
						{heading && (
							<Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{heading}</Heading>
						)}
						{children}
						<Footer />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
