#import "CDVFonts.h"
#import <Cordova/CDV.h>

@implementation CDVFonts

- (void)getFontList:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;

    NSArray *familyNames = [[NSArray alloc] initWithArray:[UIFont familyNames]];
    NSArray *fontNames;
    NSMutableArray *fonts = [NSMutableArray array];
    NSInteger indFamily;
    for (indFamily=0; indFamily<[familyNames count]; ++indFamily)
    {
        fontNames = [[NSArray alloc] initWithArray:
                     [UIFont fontNamesForFamilyName:
                      [familyNames objectAtIndex:indFamily]]];
        [fonts addObjectsFromArray:fontNames];
    }

    if (fonts != nil) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:fonts];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getDefaultFont:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    UIFont *systemFont = [UIFont systemFontOfSize:12];
    
    if (systemFont != nil) {
        NSString *fontName = systemFont.familyName;
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:fontName];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
