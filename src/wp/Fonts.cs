using System;
using System.Runtime.Serialization;

namespace WPCordovaClassLib.Cordova.Commands
{
    /// <summary>
    /// Provides information about system locale, culture settings, number formats, ect.
    /// </summary>
    public class Fonts : BaseCommand
    {
        /// <summary>
        /// Gets the string identifier for the client's current language.
        /// </summary>
        /// <param name="options"></param>               
        public void getPreferredLanguage(string options)
        {
            try
            {
                FontFamily[] fontFamilies;
                InstalledFontCollection installedFontCollection = new InstalledFontCollection();
                // Get the array of FontFamily objects.
                fontFamilies = installedFontCollection.Families;
                var language = CultureInfo.CurrentUICulture.Name;
                PluginResult result = new PluginResult(PluginResult.Status.OK, this.WrapIntoJSON(fontFamilies));
                this.DispatchCommandResult(result);
            }
            catch (Exception e)
            {
                this.DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR, e));
            }
        }

        /// <summary>
        /// Wraps data into JSON format
        /// </summary>
        /// <param name="data">data</param>
        /// <returns>data formatted as JSON object</returns>
        private string WrapIntoJSON<T>(T data, string keyName = "value")
        {
            string param = "{0}";
            string stringifiedData = data.ToString();

            if (data.GetType() == typeof(string))
            {
                param = "\"" + param + "\"";
            }

            if (data.GetType() == typeof(bool))
            {
                stringifiedData = stringifiedData.ToLower();
            }

            if (data.GetType() == typeof(string[]))
            {
                stringifiedData = JSON.JsonHelper.Serialize(data);
            }

            var formattedData = string.Format("\"" + keyName + "\":" + param, stringifiedData);
            formattedData = "{" + formattedData + "}";

            return formattedData;
        }

    }
}