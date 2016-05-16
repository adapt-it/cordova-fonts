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
}