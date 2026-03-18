import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type ProductId = Text;
  type CategoryId = Text;
  type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Nat;
    category : CategoryId;
    materials : [Text];
    imageUrls : [Text];
    stock : Nat;
    isFeatured : Bool;
    isBestSeller : Bool;
    rating : Float;
    reviewCount : Nat;
    createdAt : Time.Time;
  };

  type Category = {
    id : CategoryId;
    name : Text;
    slug : Text;
    description : Text;
    imageUrl : Text;
  };

  type CartItem = {
    productId : ProductId;
    quantity : Nat;
  };

  type WishlistItem = {
    productId : ProductId;
  };

  public type UserProfile = {
    name : Text;
  };

  module Category {
    public func compare(a : Category, b : Category) : Order.Order {
      Text.compare(a.id, b.id);
    };
  };

  module Product {
    public func compareByPrice(a : Product, b : Product) : Order.Order {
      Int.compare(a.price, b.price);
    };

    public func compare(a : Product, b : Product) : Order.Order {
      Text.compare(a.id, b.id);
    };
  };

  let products = Map.empty<ProductId, Product>();
  let categories = Map.empty<CategoryId, Category>();
  let carts = Map.empty<Principal, List.List<CartItem>>();
  let wishlists = Map.empty<Principal, List.List<WishlistItem>>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func createProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    if (products.containsKey(product.id)) {
      Runtime.trap("Product already exists");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func updateProduct(id : ProductId, product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.add(id, product);
  };

  public shared ({ caller }) func deleteProduct(id : ProductId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.remove(id);
  };

  public query ({ caller }) func getProduct(id : ProductId) : async Product {
    switch (products.get(id)) {
      case (null) {
        Runtime.trap("Product not found");
      };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func createCategory(category : Category) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create categories");
    };
    if (categories.containsKey(category.id)) {
      Runtime.trap("Category already exists");
    };
    categories.add(category.id, category);
  };

  public shared ({ caller }) func updateCategory(id : CategoryId, category : Category) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update categories");
    };
    if (not categories.containsKey(id)) {
      Runtime.trap("Category not found");
    };
    categories.add(id, category);
  };

  public shared ({ caller }) func deleteCategory(id : CategoryId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete categories");
    };
    if (not categories.containsKey(id)) {
      Runtime.trap("Category not found");
    };
    categories.remove(id);
  };

  public query ({ caller }) func getCategories() : async [Category] {
    categories.values().toArray().sort();
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().filter(func(product) { product.isFeatured }).toArray().sort(Product.compareByPrice);
  };

  public query ({ caller }) func getBestSellers() : async [Product] {
    products.values().filter(func(product) { product.isBestSeller }).toArray().sort(Product.compareByPrice);
  };

  public query ({ caller }) func getProductsByCategory(categoryId : Text) : async [Product] {
    products.values().filter(func(product) { product.category == categoryId }).toArray().sort(Product.compareByPrice);
  };

  public shared ({ caller }) func addToCart(item : CartItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add to cart");
    };
    switch (products.get(item.productId)) {
      case (null) {
        Runtime.trap("Product not found");
      };
      case (?product) {
        if (product.stock < item.quantity) {
          Runtime.trap("Not enough stock");
        };
      };
    };
    let cart = switch (carts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?cart) { cart };
    };
    cart.add(item);
    carts.add(caller, cart);
  };

  public shared ({ caller }) func removeFromCart(productId : ProductId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove from cart");
    };
    switch (carts.get(caller)) {
      case (null) {
        Runtime.trap("Cart is empty");
      };
      case (?cart) {
        let newCart = cart.filter(func(item) { item.productId != productId });
        carts.add(caller, newCart);
      };
    };
  };

  public shared ({ caller }) func updateCartQuantity(productId : ProductId, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update cart");
    };
    switch (products.get(productId)) {
      case (null) {
        Runtime.trap("Product not found");
      };
      case (?product) {
        if (product.stock < quantity) {
          Runtime.trap("Not enough stock");
        };
      };
    };
    switch (carts.get(caller)) {
      case (null) {
        Runtime.trap("Cart is empty");
      };
      case (?cart) {
        let newCart = cart.map<CartItem, CartItem>(
          func(item) {
            if (item.productId == productId) {
              { productId = item.productId; quantity };
            } else {
              item;
            };
          }
        );
        carts.add(caller, newCart);
      };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear cart");
    };
    carts.add(caller, List.empty<CartItem>());
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cart");
    };
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) {
        cart.values().toArray();
      };
    };
  };

  public shared ({ caller }) func addToWishlist(item : WishlistItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add to wishlist");
    };
    let wishlist = switch (wishlists.get(caller)) {
      case (null) { List.empty<WishlistItem>() };
      case (?wishlist) { wishlist };
    };
    wishlist.add(item);
    wishlists.add(caller, wishlist);
  };

  public shared ({ caller }) func removeFromWishlist(productId : ProductId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove from wishlist");
    };
    switch (wishlists.get(caller)) {
      case (null) {
        Runtime.trap("Wishlist is empty");
      };
      case (?wishlist) {
        let newWishlist = wishlist.filter(func(item) { item.productId != productId });
        wishlists.add(caller, newWishlist);
      };
    };
  };

  public query ({ caller }) func getWishlist() : async [WishlistItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view wishlist");
    };
    switch (wishlists.get(caller)) {
      case (null) { [] };
      case (?wishlist) { wishlist.values().toArray() };
    };
  };
};
