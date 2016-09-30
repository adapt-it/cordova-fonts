 #import <Cordova/CDV.h>

@interface CDVFonts : CDVPlugin

- (void)getFontList:(CDVInvokedUrlCommand*)command;
- (void)getDefaultFont:(CDVInvokedUrlCommand*)command;

@end