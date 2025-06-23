import { dataType } from "@/app/admin/add/_lib/types";


export const arrayToString = (arr: dataType[]) => {
	const names = arr.map((name) => {
		return name.name;
	});

	if (names.length === 1) {
		return names[0];
	} else if (names.length === 2) {
		return names[0] + ' & ' + names[1];
	} else {
		const lastElement = names.pop();
		return names.join(', ') + ' & ' + lastElement;
	}
};

// export const getRecitersLinks = (arr: Reciter[]) => {
// 	const capitalizedNames = arr.map((item) => {
// 		const name = item.name
// 			.split(' ')
// 			.map((word) => capitalize(word))
// 			.join(' ');
// 		return (
// 			<Link key={item.id} href={`/lyrics/${item.slug}`} className="hover:underline">
// 				{name}
// 			</Link>
// 		);
// 	});

// 	// Handle formatting: single name, two names with '&', and more names with commas
// 	if (capitalizedNames.length === 1) {
// 		return capitalizedNames[0];
// 	} else if (capitalizedNames.length === 2) {
// 		return (
// 			<>
// 				{capitalizedNames[0]} & {capitalizedNames[1]}
// 			</>
// 		);
// 	} else {
// 		const lastElement = capitalizedNames.pop();
// 		return (
// 			<>
// 				{capitalizedNames.map((item, index) => (
// 					<span key={index}>
// 						{item}
// 						{index < capitalizedNames.length - 1 ? ', ' : ''}
// 					</span>
// 				))}{' '}
// 				& {lastElement}
// 			</>
// 		);
// 	}
// };

export const convertLyricsArr = (english: string | null, urdu: string | null) => {
	return {
		english: english ? english.split('\n\n').map((p) => p.split('\n')) : undefined,
		urdu: urdu ? urdu.split('\n\n').map((p) => p.split('\n')) : undefined,
	};
};
