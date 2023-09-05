"use client";

import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import multiMonthPlugin from "@fullcalendar/multimonth";

const CalendarComponent = () => {
	const calendarElRef = useRef(null);

	useEffect(() => {
		const calendarEl = calendarElRef.current;

		if (calendarEl) {
			const calendar = new Calendar(calendarEl, {
				plugins: [multiMonthPlugin],
				initialView: "multiMonthFourMonth",
				views: {
					multiMonthFourMonth: {
						type: "multiMonth",
						duration: { months: 1 },
					},
				},
			});

			calendar.render();
		}
	}, []);

	return (
		<div ref={calendarElRef} className="your-calendar-container">
			{/* Kalender akan ditampilkan di dalam elemen ini */}
		</div>
	);
};

export default CalendarComponent;
