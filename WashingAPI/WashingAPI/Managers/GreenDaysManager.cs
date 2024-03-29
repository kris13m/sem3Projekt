﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WashingAPI.Managers
{
    public class GreenDaysManager
    {
        public static DateTime lastAction = DateTime.Parse("1 Jan 1970 00:00:00");
        public static bool start = false;
        public static bool actuallyRuns = false;
        public static DateTime startTime = DateTime.Parse("1 Jan 1970 00:00:00");

        public KeyValuePair<bool, string> GetAction()
        {
            TimeSpan duration = DateTime.UtcNow - lastAction;
            if (duration.Seconds > 30)
            {
                start = false;
                actuallyRuns = false;
                return new KeyValuePair<bool, string>(false, startTime.ToString("HH:mm:ss").Replace(".", ":"));
            }
            else
            {
                if (actuallyRuns)
                {
                    if (!start)
                        startTime = DateTime.UtcNow;
                    start = true;
                    DateTime future = startTime;
                    future = future.AddMinutes(90);
                    TimeSpan timeLeft = future - DateTime.UtcNow;
                    return new KeyValuePair<bool, string>(true, timeLeft.Hours + ":" + timeLeft.Minutes + ":" + timeLeft.Seconds);
                }
            }
            return new KeyValuePair<bool, string>(false, startTime.ToString("HH:mm:ss").Replace(".", ":"));
        }

        public void UpdateLastAction()
        {
            lastAction = DateTime.Now;
            actuallyRuns = true;
        }
    }
}
