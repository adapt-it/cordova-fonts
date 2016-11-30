using System;
using System.Runtime.Serialization;

namespace WPCordovaClassLib.Cordova.Commands
{
    /// <summary>
    /// Base Fonts object
    /// </summary>
    public class Fonts : BaseCommand
    {
        /// <summary>
        /// Returns a string array containing the (an-us) names of the fonts installed on the system.
        /// </summary>
        /// <param name="options"></param>               
        public void getFontList(string options)
        {
            try
            {
                string[] fontFamilies = Microsoft.Graphics.Text.CanvasTextFormat.GetSystemFontFamilies();
                PluginResult result = new PluginResult(PluginResult.Status.OK, this.WrapIntoJSON(fontFamilies));
                this.DispatchCommandResult(result);
            }
            catch (Exception)
            {
                this.DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR, new GlobalizationError()));
            }
        }
    }

    /// <summary>
    /// Wraps data into JSON format
    /// Method taken from Apache / cordova-plugin-globalization
    /// </summary>
    /// <param name="data">data</param>
    /// <returns>data formatted as JSON object</returns>
    static string WrapIntoJSON<T>(T data, string keyName = "value", string stringifiedData = null)
    {
        string param = "{0}";
        stringifiedData = stringifiedData ?? data.ToString();

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
            stringifiedData = JsonHelper.Serialize(data);
        }

        var formattedData = string.Format("\"" + keyName + "\":" + param, stringifiedData);
        formattedData = "{" + formattedData + "}";

        return formattedData;
    }    
}