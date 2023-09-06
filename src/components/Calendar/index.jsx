"use client";

import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import multiMonthPlugin from "@fullcalendar/multimonth";
import styled from "./index.module.css"

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
				headerToolbar: {
					start: null,
					center: null,
					end: null,
				},
				events: [
					{
						start: "2023-09-06",
						end: "2023-09-07",
						title: "School",
						backgroundColor: "#8811ff",
						display: "background",
					},
				],
			});

			calendar.render();
		}
	}, []);

	return <div ref={calendarElRef} className={styled.container}></div>;
};

export default CalendarComponent;
