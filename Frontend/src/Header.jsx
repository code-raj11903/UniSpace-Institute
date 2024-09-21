import React from 'react';
import {
    BsReverseLayoutTextWindowReverse,
    BsFillAwardFill,
    BsFillArchiveFill,
    BsPeopleFill
} from 'react-icons/bs';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';

function Home() {
    const revenueData = [
        { month: 'January', revenue: 4000 },
        { month: 'February', revenue: 3000 },
        { month: 'March', revenue: 5000 },
        { month: 'April', revenue: 4500 },
        { month: 'May', revenue: 6000 },
        { month: 'June', revenue: 7000 },
        { month: 'July', revenue: 8000 }
    ];

    const bookingsData = [
        { month: 'January', bookings: 150 },
        { month: 'February', bookings: 200 },
        { month: 'March', bookings: 180 },
        { month: 'April', bookings: 220 },
        { month: 'May', bookings: 250 },
        { month: 'June', bookings: 270 },
        { month: 'July', bookings: 300 }
    ];

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>DEPARTMENTS</h3>
                        <BsReverseLayoutTextWindowReverse className='card_icon' />
                    </div>
                    <h1>300</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>RESOURCES</h3>
                        <BsFillArchiveFill className='card_icon' />
                    </div>
                    <h1>12</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>CLIENTS</h3>
                        <BsPeopleFill className='card_icon' />
                    </div>
                    <h1>33</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>REVENUE</h3>
                        <BsFillAwardFill className='card_icon' />
                    </div>
                    <h1>42</h1>
                </div>
            </div>

            <div className='charts'>
                {/* Revenue Chart */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={revenueData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>

                {/* Bookings Chart */}
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={bookingsData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="bookings" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </main>
    );
}

export default Home;
