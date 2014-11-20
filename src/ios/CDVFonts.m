#import "CDVFonts.h"
#import <Cordova/CDV.h>

@implementation Fonts

- (void)fonts:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;

    NSArray *familyNames = [[NSArray alloc] initWithArray:[UIFont familyNames]];
    NSArray *fontNames;
    NSMutableArray* fonts = [NSMutableArray array];
    NSInteger indFamily, indFont;
    for (indFamily=0; indFamily<[familyNames count]; ++indFamily)
    {
        fontNames = [[NSArray alloc] initWithArray:
                     [UIFont fontNamesForFamilyName:
                      [familyNames objectAtIndex:indFamily]]];
        fontList.addObjectsFromArray(fontNames);
        [fontNames release];
    }
    [familyNames release];
    

    if (fonts != nil && [fonts length] > 0) {
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:fonts];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    [fonts release];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
