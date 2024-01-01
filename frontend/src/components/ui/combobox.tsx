"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type ComboBoxProps = {
	options: { label: string; value: string }[];
	label: string;
	width?: number;
	onSelect: (value: string) => void;
};
const ComboBox = ({ options, label, width, onSelect }: ComboBoxProps) => {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className={cn(
						"justify-between",
						width ? `w-[${width}px]` : "w-[200px]"
					)}
				>
					{value
						? options.find((option) => option.value.toLowerCase() === value)
								?.value
						: `Select ${label}...`}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className={cn("p-0", width ? `w-[${width}px]` : "w-[200px]")}
			>
				<Command>
					<CommandInput placeholder={`Search ${label}...`} />
					<CommandEmpty>No {label} found.</CommandEmpty>
					<ScrollArea className='h-[400px]'>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										onSelect(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === option.value.toLowerCase()
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									{option.value}
								</CommandItem>
							))}
						</CommandGroup>
						<ScrollBar orientation='vertical' />
					</ScrollArea>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default ComboBox;
