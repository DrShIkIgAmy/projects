using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Converter
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(false)]
    public partial class MainPage : ContentPage
    {


        public MainPage()
        {
            InitializeComponent();
            functionList.Items.Add("Dollar in Rubles");
            functionList.Items.Add("Rubles in Dollar");
            functionList.Items.Add("Euro in Rubles");
            functionList.Items.Add("Rubles in Euro");
            functionList.Items.Add("Yen in Rubles");
            functionList.Items.Add("Rubles in Yen");
            functionList.SelectedIndex = 0;
        }
     
        void onConvertClicked(object sender, EventArgs e)
        {
            try
            {
                applyTransformation(double.Parse(Input.Text.Replace('.', ',')));
            }
            catch
            {

            }
        }

        void applyTransformation(double money)
        {
            switch(functionList.SelectedIndex)
            {
                case 0:
                    Output.Text = (money * 74.66).ToString();
                    return;
                    break;
                case 1:
                    Output.Text = (money / 74.66).ToString();
                    return;
                    break;
                case 2:
                    Output.Text = (money * 81.18).ToString();
                    return;
                    break;
                case 3:
                    Output.Text = (money / 81.18).ToString();
                    return;
                    break;
                case 4:
                    Output.Text = (money * 0.68).ToString();
                    return;
                    break;
                case 5:
                    Output.Text = (money / 0.68).ToString();
                    return;
                    break;
            }
        }

        void Selected(object sender, EventArgs e)
        {
            try
            {
                applyTransformation(double.Parse(Input.Text.Replace('.',',')));
            }
            catch
            {

            }
        }
        void onClearClicked(object sender, EventArgs e)
        {
            Input.Text = "";
            Output.Text = "";
        }
    }
}
