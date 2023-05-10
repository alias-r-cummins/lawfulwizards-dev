#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "RCTMGL.h"
#import "RCTSwiftLog.h"

FOUNDATION_EXPORT double rnmapbox_mapsVersionNumber;
FOUNDATION_EXPORT const unsigned char rnmapbox_mapsVersionString[];

