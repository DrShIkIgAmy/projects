using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Secundomer
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(false)]
    public partial class MainPage : ContentPage
    {
        static bool isTimerOnRun = false;
        static CancellationTokenSource token;
        int _curTime = 0;
        string timeLine = "";
        public MainPage()
        {
            InitializeComponent();
        }

        public void pbStartClicked(object sender, EventArgs e)
        {
            if(!isTimerOnRun)
            {
                isTimerOnRun = true;
                token = new CancellationTokenSource();
                SetIntervalAsync(onTimerTicked, 100, token.Token);
            }
        }

        public void pbPasueClicked(object sender, EventArgs e)
        {
            if (isTimerOnRun)
            {
                token.Cancel();
                isTimerOnRun = false;
            }
        }

        public void pbResetClicked(object sender, EventArgs e)
        {
            if (isTimerOnRun)
            {
                token.Cancel();
                isTimerOnRun = false;
                _curTime = 0;
                Label_time.Text = "00:00:00.0";
            }
        }

        void onTimerTicked()
        {
            if(isTimerOnRun)
            {
                _curTime+=1;
                timeLine = parseTime(_curTime);
                Label_time.Text = timeLine;
            }
        }

        private string parseTime(int msec)
        {
            int allSeconds = (int)(Math.Floor((double)(msec / 10)));
            int hour = (int)(Math.Floor((double)(allSeconds / 3600)));
            int minutes = (int)(Math.Floor((double)((allSeconds % 3600)/60)));
            int seconds = allSeconds % 60;
            return hour.ToString() + ":" + minutes.ToString() + ":" + seconds.ToString()+"."+(msec%10).ToString();
        }

        public static async Task SetIntervalAsync(Action action, int delay, CancellationToken token)
        {
            try
            {
                while (!token.IsCancellationRequested)
                {
                    await Task.Delay(delay);
                    action();
                }
            }
            catch (TaskCanceledException) { }
        }
    }
}
