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
        public void getFontList(string options)
        {
            try
            {
                FontFamily[] fontFamilies;

                InstalledFontCollection installedFontCollection = new InstalledFontCollection();
                fontFamilies = installedFontCollection.Families;
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