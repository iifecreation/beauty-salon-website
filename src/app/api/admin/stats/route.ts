import { NextResponse } from "next/server";
import Student from "@/models/Student";
import Booking from "@/models/Booking";
import Service from "@/models/Service";
import Course from "@/models/Course";
import { withAdmin } from "@/lib/handlers";
import dbConnect from "@/lib/mongodb";

export const GET = withAdmin(async ({ req, user }) => {
  try {
    await dbConnect(); // ensure DB connection

    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // last day of previous month

    // ---- TOTAL STUDENTS ----
    const totalStudents = await Student.countDocuments();
    const lastMonthStudents = await Student.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });
    const studentChange =
      lastMonthStudents === 0
        ? 100
        : ((totalStudents - lastMonthStudents) / lastMonthStudents) * 100;

    // ---- TOTAL BOOKINGS ----
    const totalBookings = await Booking.countDocuments();
    const lastMonthBookings = await Booking.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });
    const bookingChange =
      lastMonthBookings === 0
        ? 100
        : ((totalBookings - lastMonthBookings) / lastMonthBookings) * 100;

    // ---- TOTAL SERVICES ----
    const totalServices = await Service.countDocuments();
    const lastMonthServices = await Service.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });
    const serviceChange =
      lastMonthServices === 0
        ? 100
        : ((totalServices - lastMonthServices) / lastMonthServices) * 100;

    // ---- TOTAL COURSES ----
    const totalCourses = await Course.countDocuments();
    const lastMonthCourses = await Course.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });
    const courseChange =
      lastMonthCourses === 0
        ? 100
        : ((totalCourses - lastMonthCourses) / lastMonthCourses) * 100;

    return NextResponse.json({
      ok: true,
      data: {
        totalStudents,
        studentChange: studentChange.toFixed(0) + "% from last month",
        totalBookings,
        bookingChange: bookingChange.toFixed(0) + "% from last month",
        totalServices,
        serviceChange: serviceChange.toFixed(0) + "% from last month",
        totalCourses,
        courseChange: courseChange.toFixed(0) + "% from last month",
      },
    });
  } catch (err) {
    console.error("Failed to fetch admin stats", err);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
});
