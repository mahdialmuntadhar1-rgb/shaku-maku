# Saku Maku Security Specification - Firestore ABAC Rules

## 1. Data Invariants & Access Models
- **User Account Registration (`/users/{userId}`)**: A user must only create or write their own user document where `userId == request.auth.uid`. No profile spoofing.
- **Local Business Listings (`/businesses/{businessId}`)**:
  - Anyone can read the verified business list.
  - Authentic, verified business owners or administrators can write/update items.
  - Standard users can only create custom listings where `ownerUid == request.auth.uid` and can only edit their own listings.
  - Features like `isVerified` or `featuredDeal` can only be set or cleared by Saku Maku Administrators.
- **Social Pulse feed (`/posts/{postId}`)**:
  - Anyone can read the stories and campaign updates.
  - Creating a social post requires being signed in and setting `authorUid == request.auth.uid`.
  - Updating a post is limited to editing the description or caption by the actual creator, or system interactions like updating likes/comments count, or admin-sponsored badging.

---

## 2. The "Dirty Dozen" Attack Payloads (Exploit Verification Models)

### Attack Phase A: Identity Spoofing & Profiling
1. **Payload 01: Profile Hijack** (User 'attacker' attempts to write to `/users/victim_user_id` to override private email or impersonate).
2. **Payload 02: Verification Self-Claim** (Standard user uploads a business with `isVerified: true` to skip moderator validation).
3. **Payload 03: Post Impersonation** (User 'attacker' creates a social feed card specifying `authorUid: "another_user"` to frame others).

### Attack Phase B: Data Integrity & Injection
4. **Payload 04: Deny-of-Wallet ID Poisoning** (Malicious query targeting `/businesses/` with a long junk document name of 4000 characters).
5. **Payload 05: Giant Review Count Injection** (Attacker writes reviews count directly to `999,999` to fake ranking metrics).
6. **Payload 06: Blank Caption Campaign** (Write a post with all null captions to corrupt localized React rendering).

### Attack Phase C: Temporal Security & State Theft
7. **Payload 07: Backdated Created Timestamp** (Attacker supplies a remote static timestamp from 2021 to fake historical relevance).
8. **Payload 08: Post Modification Hijack** (Standard user tries to update the caption on a post created by another verified user).
9. **Payload 09: System Badge Self-Grant** (Attacker injects a VIP discount badge like `promotionBadge: { ar: 'كود خصم ١٠٠٪ 🔥' }` into their post).

### Attack Phase D: Relational & Orphan Checks
10. **Payload 10: Orphaned Post Creation** (Create a post linking to a non-existent `businessId: "fake_biz_id_999"` to break join queries).
11. **Payload 11: Like Count Hijack** (Decrement likes count on competitor businesses to subvert user rating displays).
12. **Payload 12: Private Info Leak** (Querying list of user profiles attempting to extract emails or sign-in providers).

---

## 3. High-Security Firestore Rules Construction
Our rules will block all 12 payloads synchronously using robust Attribute-Based Access Control (ABAC).
