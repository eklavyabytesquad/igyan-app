export default function ChatHistory({ 
	chatHistory, 
	currentChatId, 
	onLoadChat, 
	onDeleteChat 
}) {
	return (
		<div className="space-y-2">
			{chatHistory.length === 0 ? (
				<div className="py-8 text-center">
					<p className="text-sm text-zinc-600 dark:text-zinc-400">No chat history yet</p>
					<p className="mt-1 text-xs text-zinc-500">Start a new conversation!</p>
				</div>
			) : (
				chatHistory.map((chat) => (
					<div
						key={chat.id}
						className={`group relative cursor-pointer rounded-lg p-3 transition-all hover:shadow-sm ${
							chat.id === currentChatId
								? "bg-gradient-to-r from-indigo-50 to-purple-50 border-l-2 border-indigo-500 dark:from-indigo-900/30 dark:to-purple-900/30"
								: "hover:bg-zinc-50 dark:hover:bg-zinc-800"
						}`}
						onClick={() => onLoadChat(chat)}
					>
						<div className="flex items-start justify-between gap-2">
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-indigo-500 shrink-0">
										<path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clipRule="evenodd" />
									</svg>
									<p className="truncate text-sm font-semibold text-zinc-900 dark:text-white leading-tight">
										{chat.title}
									</p>
								</div>
								<div className="flex items-center gap-2 mt-2">
									<span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
										{chat.messages?.length || 0} messages
									</span>
									<span className="text-xs text-zinc-500">
										{new Date(chat.updatedAt).toLocaleDateString('en-US', { 
											month: 'short', 
											day: 'numeric',
											hour: '2-digit',
											minute: '2-digit'
										})}
									</span>
								</div>
							</div>
							<button
								onClick={(e) => {
									e.stopPropagation();
									onDeleteChat(chat.id);
								}}
								className="shrink-0 opacity-0 group-hover:opacity-100 rounded-lg p-1.5 text-red-500 hover:bg-red-50 transition-all dark:hover:bg-red-900/20"
								title="Delete chat"
							>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
									<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
								</svg>
							</button>
						</div>
					</div>
				))
			)}
		</div>
	);
}
 


 , 


 "use client";

import { useState, useEffect } from "react";

export default function ProfileSetupModal({ initialData, onSave, onClose }) {
	const [formData, setFormData] = useState({
		name: "",
		aiName: "Sudarshan AI",
		class: "",
		school: {
			name: "",
			location: ""
		},
		classTeacher: "",
		interests: [],
		sleepTime: ""
	});

	const [interestInput, setInterestInput] = useState("");

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name.includes(".")) {
			const [parent, child] = name.split(".");
			setFormData(prev => ({
				...prev,
				[parent]: {
					...prev[parent],
					[child]: value
				}
			}));
		} else {
			setFormData(prev => ({
				...prev,
				[name]: value
			}));
		}
	};

	const handleAddInterest = () => {
		if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
			setFormData(prev => ({
				...prev,
				interests: [...prev.interests, interestInput.trim()]
			}));
			setInterestInput("");
		}
	};

	const handleRemoveInterest = (interest) => {
		setFormData(prev => ({
			...prev,
			interests: prev.interests.filter(i => i !== interest)
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.name.trim()) {
			alert("Please enter your name");
			return;
		}
		onSave(formData);
	};

	const handleClose = () => {
		if (onClose) {
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
			<div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
				{/* Header */}
				<div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white/95 backdrop-blur-sm px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/95">
					<div>
						<h2 className="text-xl font-bold text-zinc-900 dark:text-white">
							{initialData ? "Edit Your Profile" : "Setup Your Profile"}
						</h2>
						<p className="text-sm text-zinc-600 dark:text-zinc-400">
							Personalize your AI learning experience (optional)
						</p>
					</div>
					<button
						onClick={handleClose}
						className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
						title="Close"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
							<path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
						</svg>
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					{/* Personal Information */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Personal Information</h3>
						
						<div className="grid gap-4 sm:grid-cols-2">
							<div>
								<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
									Your Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									placeholder="Enter your name"
									className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
									AI Assistant Name
								</label>
								<input
									type="text"
									name="aiName"
									value={formData.aiName}
									onChange={handleInputChange}
									placeholder="E.g., Sudarshan AI, My Tutor"
									className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
								Class/Grade
							</label>
							<input
								type="text"
								name="class"
								value={formData.class}
								onChange={handleInputChange}
								placeholder="E.g., 10th, 12th, College"
								className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
							/>
						</div>
					</div>

					{/* School Information */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold text-zinc-900 dark:text-white">School/Institution</h3>
						
						<div className="grid gap-4 sm:grid-cols-2">
							<div>
								<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
									School Name
								</label>
								<input
									type="text"
									name="school.name"
									value={formData.school.name}
									onChange={handleInputChange}
									placeholder="Your school name"
									className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
									Location
								</label>
								<input
									type="text"
									name="school.location"
									value={formData.school.location}
									onChange={handleInputChange}
									placeholder="City, State"
									className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
								Class Teacher
							</label>
							<input
								type="text"
								name="classTeacher"
								value={formData.classTeacher}
								onChange={handleInputChange}
								placeholder="Teacher's name"
								className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
							/>
						</div>
					</div>

					{/* Interests */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Interests & Hobbies</h3>
						
						<div className="flex gap-2">
							<input
								type="text"
								value={interestInput}
								onChange={(e) => setInterestInput(e.target.value)}
								onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
								placeholder="Add an interest (e.g., Science, Sports)"
								className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
							/>
							<button
								type="button"
								onClick={handleAddInterest}
								className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
							>
								Add
							</button>
						</div>

						{formData.interests.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{formData.interests.map((interest, index) => (
									<span
										key={index}
										className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
									>
										{interest}
										<button
											type="button"
											onClick={() => handleRemoveInterest(interest)}
											className="hover:text-indigo-900 dark:hover:text-indigo-100"
										>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
												<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
											</svg>
										</button>
									</span>
								))}
							</div>
						)}
					</div>

					{/* Additional Info */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Additional Information</h3>
						
						<div>
							<label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
								Usual Sleep Time
							</label>
							<input
								type="text"
								name="sleepTime"
								value={formData.sleepTime}
								onChange={handleInputChange}
								placeholder="E.g., 10:00 PM"
								className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
							/>
						</div>
					</div>

					{/* Actions */}
					<div className="flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
						<button
							type="button"
							onClick={handleClose}
							className="flex-1 rounded-lg border-2 border-zinc-300 px-4 py-2.5 font-semibold text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
						>
							{initialData ? "Cancel" : "Skip for Now"}
						</button>
						<button
							type="submit"
							className="flex-1 rounded-lg bg-indigo-500 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-indigo-600"
						>
							{initialData ? "Update Profile" : "Create Profile"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}



"


"use client";

export default function StudentProfile({ profile, onEditProfile }) {
	if (!profile) {
		return (
			<div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-700 dark:bg-zinc-800">
				<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
					No profile setup yet
				</p>
				<button
					onClick={onEditProfile}
					className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
				>
					Create Profile
				</button>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Your Profile</h3>
				<button
					onClick={onEditProfile}
					className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
					title="Edit Profile"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
						<path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
					</svg>
				</button>
			</div>

			<div className="text-center mb-4">
				<div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-500 text-2xl font-bold text-white">
					{profile.name.split(" ").map((n) => n[0]).join("")}
				</div>
				<h3 className="text-lg font-bold text-zinc-900 dark:text-white">
					{profile.name}
				</h3>
				{profile.class && (
					<p className="text-sm text-zinc-600 dark:text-zinc-400">
						Class {profile.class} Student
					</p>
				)}
			</div>

			<div className="space-y-3">
				{profile.aiName && (
					<div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3 dark:border-indigo-900/50 dark:bg-indigo-900/20">
						<div className="flex items-start gap-3">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-indigo-500 shrink-0">
								<path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
							</svg>
							<div className="flex-1">
								<p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">AI Assistant Name</p>
								<p className="text-sm font-semibold text-indigo-900 dark:text-indigo-300">{profile.aiName}</p>
							</div>
						</div>
					</div>
				)}

				{profile.school?.name && (
					<div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800/50">
						<div className="flex items-start gap-3">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-indigo-500 shrink-0">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
							</svg>
							<div className="flex-1">
								<p className="text-xs text-zinc-500 dark:text-zinc-400">School</p>
								<p className="text-sm font-medium text-zinc-900 dark:text-white">{profile.school.name}</p>
								{profile.school.location && (
									<p className="text-xs text-zinc-600 dark:text-zinc-400">{profile.school.location}</p>
								)}
							</div>
						</div>
					</div>
				)}

				{profile.classTeacher && (
					<div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800/50">
						<div className="flex items-start gap-3">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-indigo-500 shrink-0">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
							</svg>
							<div className="flex-1">
								<p className="text-xs text-zinc-500 dark:text-zinc-400">Class Teacher</p>
								<p className="text-sm font-medium text-zinc-900 dark:text-white">{profile.classTeacher}</p>
							</div>
						</div>
					</div>
				)}

				{profile.interests && profile.interests.length > 0 && (
					<div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800/50">
						<div className="flex items-start gap-3">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-indigo-500 shrink-0">
								<path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
							</svg>
							<div className="flex-1">
								<p className="text-xs text-zinc-500 dark:text-zinc-400">Interests</p>
								<div className="mt-1 flex flex-wrap gap-1">
									{profile.interests.map((interest, idx) => (
										<span key={idx} className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
											{interest}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				)}

				{profile.sleepTime && (
					<div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800/50">
						<div className="flex items-start gap-3">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-indigo-500 shrink-0">
								<path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
							</svg>
							<div className="flex-1">
								<p className="text-xs text-zinc-500 dark:text-zinc-400">Sleep Time</p>
								<p className="text-sm font-medium text-zinc-900 dark:text-white">{profile.sleepTime}</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default function TypingIndicator() {
	return (
		<div className="flex gap-3">
			<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-500">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-white">
					<path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
				</svg>
			</div>
			<div className="rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800">
				<div className="flex gap-1">
					<div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]"></div>
					<div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]"></div>
					<div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"></div>
				</div>
			</div>
		</div>
	);
}
