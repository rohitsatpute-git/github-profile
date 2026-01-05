import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function ContributionGraph({ username }) {
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    setLoading(true);
    
    // Fetch from GitHub API (public, no auth needed)
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(userData => {
        // Create a mock contribution calendar from public data
        // Since public API doesn't have contribution details, we'll create a placeholder
        const mockCalendar = {
          weeks: Array.from({ length: 52 }, (_, i) => ({
            firstDayOfMonth: i % 4 === 0,
            contributionDays: Array.from({ length: 7 }, (_, day) => ({
              weekday: day,
              date: new Date(new Date().setDate(new Date().getDate() - (52 - i) * 7 - (7 - day))).toISOString(),
              contributionCount: Math.floor(Math.random() * 10)
            }))
          }))
        };
        setCalendar(mockCalendar);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching contributions:', err);
        setLoading(false);
      });
  }, [username]);

  if (loading) return <p>Loading contributions...</p>;
  if (!calendar) return <p>No data</p>;

  // Build heatmap matrix
  const weeks = calendar.weeks;
  const z = Array.from({ length: 7 }, () => []);

  weeks.forEach((week, weekIndex) => {
    week.contributionDays.forEach(day => {
      z[day.weekday][weekIndex] = day.contributionCount;
    });
  });

  // Fill empty cells
  for (let d = 0; d < 7; d++) {
    for (let w = 0; w < weeks.length; w++) {
      z[d][w] ??= 0;
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max">
        <Plot
          data={[
            {
              z,
              type: 'heatmap',
              colorscale: [
                [0, '#ebedf0'],
                [0.2, '#9be9a8'],
                [0.4, '#40c463'],
                [0.6, '#30a14e'],
                [1, '#216e39']
              ],
              showscale: false,
              hovertemplate: '%{z} contributions<extra></extra>',
              xgap: 3,
              ygap: 3
            }
          ]}
          layout={{
            yaxis: {
              ticktext: ['Mon', 'Wed', 'Sat'],
              tickvals: [1, 3, 6],
              autorange: 'reversed',
              showgrid: false,
              zeroline: false,
              side: 'left'
            },
            xaxis: { 
                ticktext: MONTHS,
                tickvals: weeks
                  .map((week, index) => ({ week, index }))
                  .filter(({ week }) => week.firstDayOfMonth)
                  .map(({ index }) => index),
                showgrid: false,
                zeroline: false
            },
            height: 140,
            width: Math.max(800, weeks.length * 15 + 100),
            margin: { l: 40, r: 20, t: 20, b: 10 },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent'
          }}
          config={{ displayModeBar: false, responsive: false }}
        />
      </div>
    </div>
  );
}
