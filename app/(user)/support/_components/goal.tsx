import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';

type Transition = {
	image: string;
	name: string;
	amount: number;
};

const transitions: Transition[] = [];

export function SupportGoal() {
	const totalGoal = 1000;
	const totalDonated = transitions.reduce((acc, curr) => acc + curr.amount, 0);
	const progressPercentage = Math.min((totalDonated / totalGoal) * 100, 100);

	return (
		<div className="space-y-6">
			<div className="bp-x space-y-2 border-b py-4">
				<h2 className="text-xl font-semibold">
					Goal: <span className="font-mono">${totalGoal}</span>
				</h2>
				<Progress value={progressPercentage} />
				<p>
					Raised{' '}
					<strong>
						<span className="font-mono">${totalDonated}</span>
					</strong>{' '}
					of <span className="font-mono">${totalGoal}</span> goal.
				</p>
			</div>
			<div className="bp-x space-y-3 py-2">
				<h2 className="text-xl font-semibold">Recent Donors</h2>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-12">#</TableHead>
							<TableHead>Donor</TableHead>
							<TableHead>Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{transitions.length > 0 ? (
							transitions.map((donor, index) => (
								<TableRow key={index}>
									<TableCell>{index + 1}</TableCell>
									<TableCell className="flex items-center gap-2">
										<img src={donor.image} alt={donor.name} width={32} height={32} className="rounded-full" />
										{donor.name}
									</TableCell>
									<TableCell>${donor.amount}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={3} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
