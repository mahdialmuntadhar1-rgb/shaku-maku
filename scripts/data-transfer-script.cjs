// Data Transfer Script: Shako Maku to Bulk Message Sender
// This script transfers business data, user data, and social posts from Shako Maku to the bulk message app

const fs = require('fs');
const path = require('path');

// Configuration
const SHAKU_MAKU_DIR = path.join(__dirname, '..');
const BULK_MESSAGE_DIR = path.join(__dirname, '..', '..', 'BEST-SENDER-WHATSAPP');
const OUTPUT_DIR = path.join(BULK_MESSAGE_DIR, 'imported-data');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read Shako Maku data files
function readShakuMakuData() {
  const data = {
    businesses: [],
    users: [],
    posts: [],
    categories: [],
    governorates: []
  };

  try {
    // Read businesses data
    const businessesPath = path.join(SHAKU_MAKU_DIR, 'public', 'iraq_businesses.json');
    if (fs.existsSync(businessesPath)) {
      const businessesData = fs.readFileSync(businessesPath, 'utf8');
      data.businesses = JSON.parse(businessesData);
      console.log(`✅ Read ${data.businesses.length} businesses from Shako Maku`);
    }

    // Read posts data
    const postsPath = path.join(SHAKU_MAKU_DIR, 'public', 'iraq_posts.json');
    if (fs.existsSync(postsPath)) {
      const postsData = fs.readFileSync(postsPath, 'utf8');
      data.posts = JSON.parse(postsData);
      console.log(`✅ Read ${data.posts.length} posts from Shako Maku`);
    }

    // Read categories and governorates from data files
    const dataPath = path.join(SHAKU_MAKU_DIR, 'src', 'data.ts');
    if (fs.existsSync(dataPath)) {
      const dataContent = fs.readFileSync(dataPath, 'utf8');
      // Extract categories and governorates from the TypeScript file
      // This is a simplified extraction - you might need to adjust based on actual file structure
      console.log(`✅ Read data structure from Shako Maku`);
    }

  } catch (error) {
    console.error('❌ Error reading Shako Maku data:', error);
  }

  return data;
}

// Transform business data for bulk message app
function transformBusinessData(businesses) {
  return businesses.map((business, index) => {
    // Extract phone number from business data
    const phone = business.phoneNumber || '';
    
    // Create contact entry for bulk messaging
    return {
      id: `shaku_business_${index + 1}`,
      name: business.name.en || business.name.ar || business.name.ku,
      phone: phone,
      governorate: business.governorate,
      category: business.category,
      source: 'shaku_maku',
      originalId: business.id,
      // Additional fields for bulk messaging
      address: business.address.en || business.address.ar || business.address.ku,
      rating: business.rating,
      isVerified: business.isVerified,
      description: business.description.en || business.description.ar || business.description.ku,
      // WhatsApp contact info (if available)
      whatsapp: phone, // Default to phone number
      email: '', // Not available in current structure
      website: '', // Not available in current structure
      // Tags for targeted messaging
      tags: [
        business.category,
        business.governorate,
        business.isVerified ? 'verified' : 'unverified',
        `rating_${Math.floor(business.rating)}`
      ].filter(Boolean),
      // Message preferences
      preferredLanguage: 'ar', // Default to Arabic for Iraqi businesses
      messageHistory: [],
      lastContacted: null,
      contactFrequency: 'weekly' // Default frequency
    };
  });
}

// Transform user data for bulk message app
function transformUserData(users) {
  return users.map((user, index) => {
    return {
      id: `shaku_user_${index + 1}`,
      name: user.displayName || 'Unknown User',
      phone: '', // Phone not available in current structure
      email: user.email || '',
      governorate: 'all', // Not specified in current structure
      source: 'shaku_maku',
      originalId: user.uid,
      role: user.role || 'user',
      onboarded: user.onboarded || false,
      businessId: user.businessId || null,
      // Bulk messaging specific fields
      tags: [
        user.role || 'user',
        user.onboarded ? 'onboarded' : 'not_onboarded'
      ].filter(Boolean),
      preferredLanguage: 'ar',
      messageHistory: [],
      lastContacted: null,
      contactFrequency: 'monthly'
    };
  });
}

// Transform social posts data for bulk message app
function transformPostsData(posts) {
  return posts.map((post, index) => {
    return {
      id: `shaku_post_${index + 1}`,
      businessId: post.businessId,
      businessName: post.businessName,
      category: post.category,
      governorate: post.governorate,
      source: 'shaku_maku',
      originalId: post.id,
      // Content for messaging
      caption: post.caption.en || post.caption.ar || post.caption.ku,
      mediaUrl: post.mediaUrl,
      videoUrl: post.videoUrl || '',
      // Engagement metrics
      likes: post.likes || 0,
      commentsCount: post.commentsCount || 0,
      shares: post.shares || 0,
      views: post.views || 0,
      // Timestamp
      createdAt: new Date().toISOString(), // Use current time as fallback
      // Tags for targeting
      tags: [
        post.category,
        post.governorate,
        post.promotionBadge ? 'promotion' : 'regular'
      ].filter(Boolean),
      // Contact info from post
      contactPhone: '', // Not available in current structure
      contactEmail: '', // Not available in current structure
      // Message content
      messageContent: post.caption.en || post.caption.ar || post.caption.ku,
      messageType: 'promotion',
      targetAudience: 'general'
    };
  });
}

// Generate CSV files for bulk message app import
function generateCSVFiles(transformedData) {
  const csvFiles = {};

  // Businesses CSV
  if (transformedData.businesses.length > 0) {
    const businessCSV = [
      'ID,Name,Phone,Governorate,Category,Address,Rating,Verified,Description,WhatsApp,Email,Website,Tags,PreferredLanguage,ContactFrequency',
      ...transformedData.businesses.map(business => 
        `"${business.id}","${business.name}","${business.phone}","${business.governorate}","${business.category}","${business.address}","${business.rating}","${business.isVerified}","${business.description}","${business.whatsapp}","${business.email}","${business.website}","${business.tags.join(';')}","${business.preferredLanguage}","${business.contactFrequency}"`
      )
    ].join('\n');
    
    csvFiles.businesses = businessCSV;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'shaku_maku_businesses.csv'), businessCSV);
    console.log(`✅ Generated businesses CSV with ${transformedData.businesses.length} records`);
  }

  // Users CSV
  if (transformedData.users.length > 0) {
    const usersCSV = [
      'ID,Name,Phone,Email,Governorate,Role,Onboarded,BusinessId,Tags,PreferredLanguage,ContactFrequency',
      ...transformedData.users.map(user => 
        `"${user.id}","${user.name}","${user.phone}","${user.email}","${user.governorate}","${user.role}","${user.onboarded}","${user.businessId}","${user.tags.join(';')}","${user.preferredLanguage}","${user.contactFrequency}"`
      )
    ].join('\n');
    
    csvFiles.users = usersCSV;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'shaku_maku_users.csv'), usersCSV);
    console.log(`✅ Generated users CSV with ${transformedData.users.length} records`);
  }

  // Posts CSV (for content messaging)
  if (transformedData.posts.length > 0) {
    const postsCSV = [
      'ID,BusinessName,Category,Governorate,Caption,MediaUrl,VideoUrl,Likes,Comments,Shares,Views,Tags,MessageContent,MessageType,TargetAudience',
      ...transformedData.posts.map(post => 
        `"${post.id}","${post.businessName}","${post.category}","${post.governorate}","${post.caption}","${post.mediaUrl}","${post.videoUrl}","${post.likes}","${post.commentsCount}","${post.shares}","${post.views}","${post.tags.join(';')}","${post.messageContent}","${post.messageType}","${post.targetAudience}"`
      )
    ].join('\n');
    
    csvFiles.posts = postsCSV;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'shaku_maku_posts.csv'), postsCSV);
    console.log(`✅ Generated posts CSV with ${transformedData.posts.length} records`);
  }

  return csvFiles;
}

// Generate JSON files for bulk message app
function generateJSONFiles(transformedData) {
  // Businesses JSON
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'shaku_maku_businesses.json'),
    JSON.stringify(transformedData.businesses, null, 2)
  );
  console.log(`✅ Generated businesses JSON with ${transformedData.businesses.length} records`);

  // Users JSON
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'shaku_maku_users.json'),
    JSON.stringify(transformedData.users, null, 2)
  );
  console.log(`✅ Generated users JSON with ${transformedData.users.length} records`);

  // Posts JSON
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'shaku_maku_posts.json'),
    JSON.stringify(transformedData.posts, null, 2)
  );
  console.log(`✅ Generated posts JSON with ${transformedData.posts.length} records`);

  // Combined summary
  const summary = {
    transferDate: new Date().toISOString(),
    source: 'shaku_maku',
    target: 'bulk_message_sender',
    summary: {
      businesses: transformedData.businesses.length,
      users: transformedData.users.length,
      posts: transformedData.posts.length
    },
    data: transformedData
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'transfer_summary.json'),
    JSON.stringify(summary, null, 2)
  );
  console.log(`✅ Generated transfer summary`);
}

// Main transfer function
function transferData() {
  console.log('🚀 Starting data transfer from Shako Maku to Bulk Message Sender...\n');

  // Read source data
  const sourceData = readShakuMakuData();

  // Transform data
  const transformedData = {
    businesses: transformBusinessData(sourceData.businesses),
    users: transformUserData(sourceData.users),
    posts: transformPostsData(sourceData.posts)
  };

  console.log('\n📊 Data transformation complete:');
  console.log(`   - Businesses: ${transformedData.businesses.length}`);
  console.log(`   - Users: ${transformedData.users.length}`);
  console.log(`   - Posts: ${transformedData.posts.length}`);

  // Generate output files
  generateCSVFiles(transformedData);
  generateJSONFiles(transformedData);

  console.log('\n✅ Data transfer completed successfully!');
  console.log(`📁 Output files saved to: ${OUTPUT_DIR}`);
  console.log('\n📋 Generated files:');
  console.log('   - shaku_maku_businesses.csv');
  console.log('   - shaku_maku_users.csv');
  console.log('   - shaku_maku_posts.csv');
  console.log('   - shaku_maku_businesses.json');
  console.log('   - shaku_maku_users.json');
  console.log('   - shaku_maku_posts.json');
  console.log('   - transfer_summary.json');

  console.log('\n🎯 Next steps:');
  console.log('1. Import the CSV files into the Bulk Message Sender application');
  console.log('2. Use the JSON files for API integration');
  console.log('3. Verify data integrity after import');
  console.log('4. Set up messaging campaigns using the imported data');
}

// Run the transfer
if (require.main === module) {
  transferData();
}

module.exports = {
  transferData,
  readShakuMakuData,
  transformBusinessData,
  transformUserData,
  transformPostsData,
  generateCSVFiles,
  generateJSONFiles
};
