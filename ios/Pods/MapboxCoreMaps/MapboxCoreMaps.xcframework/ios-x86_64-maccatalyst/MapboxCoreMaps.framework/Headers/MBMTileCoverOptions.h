// This file is generated and will be overwritten automatically.

#import <Foundation/Foundation.h>

/** Various options needed for tile cover */
NS_SWIFT_NAME(TileCoverOptions)
__attribute__((visibility ("default")))
@interface MBMTileCoverOptions : NSObject

// This class provides custom init which should be called
- (nonnull instancetype)init NS_UNAVAILABLE;

// This class provides custom init which should be called
+ (nonnull instancetype)new NS_UNAVAILABLE;

- (nonnull instancetype)initWithTileSize:(nullable NSNumber *)tileSize
                                 minZoom:(nullable NSNumber *)minZoom
                                 maxZoom:(nullable NSNumber *)maxZoom
                               roundZoom:(nullable NSNumber *)roundZoom NS_REFINED_FOR_SWIFT;

/** tile size of the source. Defaults to 512. */
@property (nonatomic, readonly, nullable) NSNumber *tileSize;

/**
 * min zoom defined in the source between range [0, 22].
 * if not provided or is out of range, defaults to 0.
 */
@property (nonatomic, readonly, nullable) NSNumber *minZoom;

/**
 * max zoom defined in the source between range [0, 22].
 * should be greater than or equal to minZoom.
 * if not provided or is out of range, defaults to 22.0.
 */
@property (nonatomic, readonly, nullable) NSNumber *maxZoom;

/**
 * whether to round zoom values when calculating tilecover.
 * Set this to true for raster and raster-dem sources.
 * If not specified, defaults to false.
 */
@property (nonatomic, readonly, nullable) NSNumber *roundZoom;


@end
