import * as WishlistService from "./services/wishlistService";
import * as WishlistEntryService from "./services/wishlistEntryService";

export default {
  Wishlist: {
    WishlistEntries: (parent, args, context, info) => parent.getWishlistEntries()
  },
  Query: {
    wishlists: (parent, _, { db }, info) => WishlistService.getAllWishlists(),
    wishlist: (parent, { id }, { db }, info) => WishlistService.findWishlistById(id),
    wishlistByOpp: (parent, { opportunitySFID }, { db }, info) =>
      WishlistService.findWishlistByOpportunityId(opportunitySFID),
    wishlistEntries: (parent, _, { db }, info) => WishlistEntryService.getAllWishlistEntries(),
    wishlistEntryByWishlistID: (parent, { wishlistID}, { db }, info) => WishlistEntryService.findEntriesByWishlistId(wishlistID)
  },
  Mutation: {
    createWishlist: (parent, { opportunitySFID }, { db }, info) => WishlistService.createWishlist(opportunitySFID),
    deleteWishlist: (parent, { id }, { db }, info) => WishlistService.deleteWishlistById(id),
    createWishlistEntry: async (parent, { wishlistId, reservableUUID, createdBy, opportunitySFID }, { db }, info) => {
      let wishlistEntry = await WishlistEntryService.createWishlistEntry(
        wishlistId,
        reservableUUID,
        createdBy,
        opportunitySFID
      );

      return {
        success: true,
        message: "Wishlist and WishlistEntry Created Successfully!",
        wishlistEntry: wishlistEntry
      };
    }
  }
};
