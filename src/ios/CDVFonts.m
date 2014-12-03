#import "CDVFonts.h"
#import <Cordova/CDV.h>

@implementation CDVFonts

- (void)getFontList:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;

    NSArray *familyNames = [[NSArray alloc] initWithArray:[UIFont familyNames]];
    NSArray *fontNames;
    NSMutableArray *fonts = [NSMutableArray array];
    NSInteger indFamily, indFont;
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

@end
