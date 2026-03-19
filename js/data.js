// FeedMe Guideline - Content Data
const SITE_DATA = {
  siteName: "MIPOS X FeedMe Guideline",
  siteTagline: "Setup guides, tutorials, and troubleshooting for FeedMe Portal & POS",
  portalUrl: "https://portal.feedme.com",

  categories: [
    {
      id: "menu-setup",
      section: "portal",
      name: "Menu Setup",
      icon: "🍽️",
      color: "#FF6B35",
      bgColor: "#FFF0EB",
      description: "Create products, variants, add-on options, menu schedulers and catalogs for your restaurant.",
      articles: [
        {
          id: "create-new-product",
          title: "How to Create New Product",
          description: "Learn how to add a new product to your restaurant menu in the FeedMe Portal.",
          tags: ["menu", "product", "create"],
          scribeEmbed: "https://scribehow.com/embed/How_to_Create_New_Product__wIqj9T_8QZyDJGBhLXF35g",
          content: `
            <h2>Overview</h2>
            <p>This guide walks you through creating a new product in the FeedMe Portal. Products are the core items displayed on your restaurant menu.</p>
            <h2>Steps</h2>
            <div class="step">
              <div class="step-num">1</div>
              <div class="step-content">
                <h4>Navigate to Menu Management</h4>
                <p>In the FeedMe Portal, go to the left sidebar and click on <strong>"Menu"</strong> to expand the menu options.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div class="step-content">
                <h4>Click "Create Product"</h4>
                <p>Click the <strong>"+ Create Product"</strong> button in the top-right corner of the product list page.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div class="step-content">
                <h4>Fill in Product Details</h4>
                <p>Enter the product name, description, price, and upload a product image. Set the category and any applicable tags.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">4</div>
              <div class="step-content">
                <h4>Save and Publish</h4>
                <p>Review your product details and click <strong>"Save"</strong>. Toggle the publish switch to make it visible on your menu.</p>
              </div>
            </div>
          `
        },
        {
          id: "create-variant",
          title: "How to Create Variant",
          description: "Set up product variants like sizes, flavors, or other options for your menu items.",
          tags: ["menu", "variant", "product"],
          scribeEmbed: "https://scribehow.com/embed/How_to_Variant__9Pn01DdPTl2MyUK1GIl8HQ",
          content: `
            <h2>Overview</h2>
            <p>Variants allow you to offer different options for a product, such as sizes (Small, Medium, Large) or flavors.</p>
            <h2>Steps</h2>
            <div class="step">
              <div class="step-num">1</div>
              <div class="step-content">
                <h4>Go to the Product</h4>
                <p>Navigate to <strong>Menu → Products</strong> and click on the product you want to add variants to.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div class="step-content">
                <h4>Open Variant Settings</h4>
                <p>Scroll down to the <strong>"Variants"</strong> section and click <strong>"+ Add Variant Group"</strong>.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div class="step-content">
                <h4>Configure Variant Options</h4>
                <p>Enter the variant group name (e.g., "Size"), then add each option with its name and price adjustment.</p>
              </div>
            </div>
          `
        },
        {
          id: "edit-product",
          title: "How to Edit Product",
          description: "Update product details, pricing, images, and availability settings.",
          tags: ["menu", "product", "edit"],
          scribeEmbed: "https://scribehow.com/embed/How_to_Edit_Product__GmJapbynTqmO5IwGf56QwQ",
          content: `
            <h2>Overview</h2>
            <p>This guide shows you how to edit existing products in your FeedMe menu.</p>
            <h2>Steps</h2>
            <div class="step">
              <div class="step-num">1</div>
              <div class="step-content">
                <h4>Find the Product</h4>
                <p>Go to <strong>Menu → Products</strong> and locate the product you want to edit. You can use the search bar to find it quickly.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div class="step-content">
                <h4>Edit Details</h4>
                <p>Click on the product to open its details. Modify the name, description, price, image, or any other fields as needed.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div class="step-content">
                <h4>Save Changes</h4>
                <p>Click <strong>"Save"</strong> to apply your changes. The updates will be reflected immediately on your menu.</p>
              </div>
            </div>
          `
        },
        {
          id: "create-addon-options",
          title: "How to Create Add-on Options",
          description: "Set up add-on options that customers can select when ordering items.",
          tags: ["menu", "addon", "options"],
          scribeEmbed: "https://scribehow.com/embed/How_to_Create_Add-on_Options__fSm52nMiQw2FKAggRlJ9jQ",
          content: `
            <h2>Overview</h2>
            <p>Add-on options allow customers to customize their orders with extras like toppings, sides, or special requests.</p>
            <h2>Steps</h2>
            <div class="step">
              <div class="step-num">1</div>
              <div class="step-content">
                <h4>Navigate to Add-on Settings</h4>
                <p>Go to <strong>Menu → Add-on Options</strong> in the FeedMe Portal sidebar.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div class="step-content">
                <h4>Create Add-on Group</h4>
                <p>Click <strong>"+ Create Add-on Group"</strong>. Enter a group name (e.g., "Extra Toppings") and set selection rules (min/max selections).</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div class="step-content">
                <h4>Add Items to Group</h4>
                <p>Add individual add-on items with their names and prices. Toggle availability as needed.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">4</div>
              <div class="step-content">
                <h4>Link to Products</h4>
                <p>Assign the add-on group to specific products so customers can see these options when ordering.</p>
              </div>
            </div>
          `
        },
        {
          id: "create-menu-scheduler",
          title: "How to Create Menu Scheduler",
          description: "Schedule when specific menu items or categories are available for ordering.",
          tags: ["menu", "scheduler", "availability"],
          scribeEmbed: "https://scribehow.com/embed/How_to_Create_Menu_Scheduler__GQqDdRD8Scyfevw_pnGkqQ",
          content: `
            <h2>Overview</h2>
            <p>The Menu Scheduler lets you control when certain items appear on your menu — perfect for breakfast, lunch, dinner, or special promotions.</p>
            <h2>Steps</h2>
            <div class="step">
              <div class="step-num">1</div>
              <div class="step-content">
                <h4>Go to Menu Scheduler</h4>
                <p>Navigate to <strong>Menu → Scheduler</strong> in the FeedMe Portal.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div class="step-content">
                <h4>Create New Schedule</h4>
                <p>Click <strong>"+ New Schedule"</strong>. Set the schedule name, days of the week, and time range.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div class="step-content">
                <h4>Assign Menu Items</h4>
                <p>Select which products or categories should follow this schedule. Items will only be visible during the scheduled time.</p>
              </div>
            </div>
          `
        },
        {
          id: "create-catalog",
          title: "How to Create Catalog",
          description: "Organize your menu items into catalogs for better structure and presentation.",
          tags: ["menu", "catalog", "organize"],
          scribeEmbed: "https://scribehow.com/embed/How_to_Create_Catalog__fi13bbz8SluIDFbXubHJyQ",
          content: `
            <h2>Overview</h2>
            <p>Catalogs help you organize your menu into logical groups, making it easier for customers to browse and order.</p>
            <h2>Steps</h2>
            <div class="step">
              <div class="step-num">1</div>
              <div class="step-content">
                <h4>Navigate to Catalog</h4>
                <p>Go to <strong>Menu → Catalog</strong> in the portal sidebar.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div class="step-content">
                <h4>Create New Catalog</h4>
                <p>Click <strong>"+ Create Catalog"</strong>. Enter a name, description, and optionally upload a cover image.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div class="step-content">
                <h4>Add Products</h4>
                <p>Drag and drop or select products to include in this catalog. Arrange them in your preferred display order.</p>
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: "connect-setup",
      section: "portal",
      name: "Connect Setup",
      icon: "🔗",
      color: "#4A6CF7",
      bgColor: "#EBF0FF",
      description: "Promotions, vouchers, broadcasts, memberships, loyalty programs and reward campaigns.",
      articles: [
        {
          id: "promotion-item-discount",
          title: "Create Promotion Campaign (Item Discount)",
          description: "Set up item-level discount promotions to attract more customers.",
          tags: ["connect", "promotion", "discount", "item"],
          scribeEmbed: "https://scribehow.com/embed/Create_Promotion_Campaign_Item_Discount__aUiVym5MRSq3mFuVHGChjQ",
          content: `<h2>Overview</h2><p>Item discount promotions allow you to offer discounts on specific menu items. This guide shows you how to create and configure one in the FeedMe Portal.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Go to Connect → Promotions</h4><p>Navigate to the <strong>Connect</strong> section and click on <strong>Promotions</strong>.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Create New Promotion</h4><p>Click <strong>"+ Create Promotion"</strong> and select <strong>"Item Discount"</strong> as the type.</p></div></div>
            <div class="step"><div class="step-num">3</div><div class="step-content"><h4>Configure Discount</h4><p>Set the discount amount (percentage or fixed), select applicable items, and define the promotion period.</p></div></div>
            <div class="step"><div class="step-num">4</div><div class="step-content"><h4>Activate</h4><p>Review and click <strong>"Publish"</strong> to make the promotion live.</p></div></div>`
        },
        {
          id: "promotion-bill-discount",
          title: "Create Promotion Campaign (Bill Discount)",
          description: "Create bill-level discount promotions for entire orders.",
          tags: ["connect", "promotion", "discount", "bill"],
          scribeEmbed: "https://scribehow.com/embed/Create_Promotion_Campaign_Bill_Discount__vbhxHdq2R7mAcumN6nRcDA",
          content: `<h2>Overview</h2><p>Bill discount promotions apply discounts to the entire order total, encouraging higher spending.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Go to Connect → Promotions</h4><p>Navigate to <strong>Connect → Promotions</strong>.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Create Bill Discount</h4><p>Click <strong>"+ Create Promotion"</strong> and select <strong>"Bill Discount"</strong> type.</p></div></div>
            <div class="step"><div class="step-num">3</div><div class="step-content"><h4>Set Conditions</h4><p>Define minimum order amount, discount value, and the campaign duration.</p></div></div>`
        },
        {
          id: "voucher-campaign-bill",
          title: "Create Voucher Campaign (Bill Discount)",
          description: "Generate voucher codes that provide bill-level discounts.",
          tags: ["connect", "voucher", "discount", "bill"],
          scribeEmbed: "https://scribehow.com/embed/Create_Voucher_Campaign_Bill_Discount__ieHwgXdOTRSQGLRhIFQpIA",
          content: `<h2>Overview</h2><p>Voucher campaigns let you generate redeemable codes for bill discounts.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Navigate to Vouchers</h4><p>Go to <strong>Connect → Vouchers</strong>.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Create Voucher Campaign</h4><p>Click <strong>"+ Create Voucher"</strong> and select <strong>"Bill Discount"</strong>.</p></div></div>
            <div class="step"><div class="step-num">3</div><div class="step-content"><h4>Configure and Generate</h4><p>Set the discount value, usage limits, validity period, and generate voucher codes.</p></div></div>`
        },
        {
          id: "voucher-code-campaign",
          title: "Create Voucher Code Campaign",
          description: "Create custom voucher codes for marketing campaigns and customer rewards.",
          tags: ["connect", "voucher", "code", "campaign"],
          scribeEmbed: "https://scribehow.com/embed/Create_a_Voucher_Code__jDYZkUUwSmiJVhqb3RR8wA",
          content: `<h2>Overview</h2><p>Custom voucher codes can be used for targeted marketing campaigns.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Go to Voucher Codes</h4><p>Navigate to <strong>Connect → Voucher Codes</strong>.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Create Campaign</h4><p>Click <strong>"+ Create Campaign"</strong>, enter the campaign name and set a custom voucher code prefix.</p></div></div>
            <div class="step"><div class="step-num">3</div><div class="step-content"><h4>Set Rules and Publish</h4><p>Define redemption rules, expiry date, and usage limits. Click <strong>"Publish"</strong> to activate.</p></div></div>`
        },
        {
          id: "broadcast-campaign",
          title: "Create Broadcast Campaign",
          description: "Send targeted broadcast messages to your customer base.",
          tags: ["connect", "broadcast", "marketing", "message"],
          scribeEmbed: "https://scribehow.com/embed/Create_Broadcast_Campaign__0H2HgNLERSaacY_6NHyWDQ",
          content: `<h2>Overview</h2><p>Broadcast campaigns allow you to send push notifications or messages to your customers.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Navigate to Broadcasts</h4><p>Go to <strong>Connect → Broadcast</strong>.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Create New Broadcast</h4><p>Click <strong>"+ Create Broadcast"</strong>. Choose your target audience and message type.</p></div></div>
            <div class="step"><div class="step-num">3</div><div class="step-content"><h4>Compose and Send</h4><p>Write your broadcast message, attach any images or promotions, and schedule or send immediately.</p></div></div>`
        },
        {
          id: "membership-tiers",
          title: "Create Membership Tiers and Experience",
          description: "Set up membership levels with tiered benefits and rewards for loyal customers.",
          tags: ["connect", "membership", "tiers", "loyalty"],
          scribeEmbed: "https://scribehow.com/embed/Create_Membership_Tiers_and_Experience__DdW_kmhzR4e86bm3csIGyA",
          content: `<h2>Overview</h2><p>Membership tiers create a loyalty hierarchy for your customers with escalating benefits.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Go to Membership</h4><p>Navigate to <strong>Connect → Membership</strong>.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Create Tiers</h4><p>Define tier names (e.g., Silver, Gold, Platinum), point thresholds, and benefits for each level.</p></div></div>
            <div class="step"><div class="step-num">3</div><div class="step-content"><h4>Configure Experience</h4><p>Set up the customer experience — how points are earned, what rewards are unlocked at each tier.</p></div></div>`
        },
        {
          id: "create-title",
          title: "Create Title",
          description: "Create customer titles and badges for your loyalty program.",
          tags: ["connect", "title", "badge", "loyalty"],
          scribeEmbed: "https://scribehow.com/embed/Create_Title__IRlggo-tTTGk0ZcHT930yA",
          content: `<h2>Overview</h2><p>Titles are special badges or labels assigned to customers based on their activity or membership level.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Navigate to Titles</h4><p>Go to <strong>Connect → Titles</strong>.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Create New Title</h4><p>Click <strong>"+ Create Title"</strong>, set the title name, icon, and criteria for earning it.</p></div></div>`
        },
        {
          id: "point-program",
          title: "Create Point Program",
          description: "Set up a points-based loyalty program for customer retention.",
          tags: ["connect", "points", "loyalty", "rewards"],
          scribeEmbed: "https://scribehow.com/embed/Create_Point_Campaign__hlvcCc0fTDaNjU1szlXBJQ",
          content: `<h2>Overview</h2><p>A point program rewards customers with points for every purchase, which can be redeemed for discounts or free items.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Go to Point Program</h4><p>Navigate to <strong>Connect → Point Program</strong>.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Configure Earning Rules</h4><p>Set how many points customers earn per RM spent (e.g., RM1 = 1 point).</p></div></div>
            <div class="step"><div class="step-num">3</div><div class="step-content"><h4>Set Redemption Options</h4><p>Define what rewards can be redeemed with points and the point values required.</p></div></div>`
        },
        {
          id: "cashback-program",
          title: "Create Cashback Program",
          description: "Offer cashback rewards to encourage repeat purchases.",
          tags: ["connect", "cashback", "rewards"],
          scribeEmbed: "https://scribehow.com/embed/Create_Cashback_Program__m9X_b_eXTSCqWC_JVS5ekg",
          content: `<h2>Overview</h2><p>Cashback programs return a percentage of the purchase amount as store credit.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Navigate to Cashback</h4><p>Go to <strong>Connect → Cashback</strong>.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Create Cashback Program</h4><p>Set the cashback percentage, minimum spend requirement, and expiry period for the cashback credit.</p></div></div>`
        },
        {
          id: "spin-win-game",
          title: "Create a Spin and Win Game Program",
          description: "Create an interactive spin-the-wheel game for customer engagement.",
          tags: ["connect", "game", "spin", "engagement"],
          scribeEmbed: "https://scribehow.com/embed/Create_a_Spin_and_Win_Game_Program__nVX091WFS8GWVSZ8F8ixGw",
          content: `<h2>Overview</h2><p>Spin and Win games are gamified promotions that let customers spin a wheel for prizes.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Go to Games</h4><p>Navigate to <strong>Connect → Games → Spin and Win</strong>.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Configure the Wheel</h4><p>Add prize segments, set win probabilities, and customize the wheel appearance.</p></div></div>
            <div class="step"><div class="step-num">3</div><div class="step-content"><h4>Set Participation Rules</h4><p>Define how customers can earn spins (e.g., per purchase, membership action).</p></div></div>`
        },
        {
          id: "mission-program",
          title: "Create Mission Program",
          description: "Set up mission-based challenges for customers to complete and earn rewards.",
          tags: ["connect", "mission", "challenge", "engagement"],
          scribeEmbed: "https://scribehow.com/embed/Create_Mission_Program__4twUqx_bS9-iRa8M_7KZ5w",
          content: `<h2>Overview</h2><p>Mission programs challenge customers to complete specific actions in exchange for rewards.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Navigate to Missions</h4><p>Go to <strong>Connect → Missions</strong>.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Create Mission</h4><p>Define the mission name, required actions (e.g., "Order 5 times"), and the reward for completion.</p></div></div>`
        },
        {
          id: "points-redeem-reward",
          title: "Create Points Redeem Reward",
          description: "Set up rewards that customers can redeem using their loyalty points.",
          tags: ["connect", "points", "redeem", "reward"],
          scribeEmbed: "https://scribehow.com/embed/Create_Points_Redeem_Reward__4oyDIS7fQGGDSXXtLsqfwQ",
          content: `<h2>Overview</h2><p>Points Redeem Rewards are items or discounts customers can exchange their accumulated points for.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Go to Redeem Rewards</h4><p>Navigate to <strong>Connect → Point Program → Redeem Rewards</strong>.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Create Reward</h4><p>Click <strong>"+ Create Reward"</strong>. Set the reward type (item, discount, or voucher), points required, and availability period.</p></div></div>`
        }
      ]
    },
    {
      id: "restaurant-operation",
      section: "portal",
      name: "Restaurant Operation",
      icon: "🏪",
      color: "#22C55E",
      bgColor: "#EBFFF4",
      description: "Day-to-day restaurant operations, order management, and workflow guides.",
      articles: [
        {
          id: "service-charge-setup",
          title: "Service Charge Setup",
          description: "Configure service charge rates and rules for your restaurant.",
          tags: ["operation", "service-charge", "setup"],
          scribeEmbed: "https://scribehow.com/embed/Service_Charge_Setup__KzPBr2GwRhGhLFu5-TrlBQ",
          content: `<h2>Overview</h2><p>This guide shows you how to configure service charge settings for your restaurant in the FeedMe Portal.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Navigate to Settings</h4><p>Go to <strong>Settings → Service Charge</strong> in the FeedMe Portal.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Configure Rate</h4><p>Set the service charge percentage and configure when it should be applied.</p></div></div>`
        },
        {
          id: "table-setup",
          title: "Table Setup",
          description: "Configure your restaurant's table layout and QR ordering setup.",
          tags: ["operation", "table", "setup", "qr"],
          scribeEmbed: "https://scribehow.com/embed/Tables_Setup__0Z5Z1aYvQqKGNjFJV0eMtw",
          content: `<h2>Overview</h2><p>Set up your restaurant's table layout for dine-in ordering and QR code generation.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Navigate to Table Setup</h4><p>Go to <strong>Operations → Table Setup</strong>.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Add Tables</h4><p>Click <strong>"+ Add Table"</strong> to create tables. Set table numbers, seating capacity, and section assignments.</p></div></div>
            <div class="step"><div class="step-num">3</div><div class="step-content"><h4>Generate QR Codes</h4><p>Click <strong>"Generate QR"</strong> for each table to create unique QR codes for customer ordering.</p></div></div>`
        },
        {
          id: "reason-template-setup",
          title: "Reason Template Setup",
          description: "Create predefined reason templates for order cancellations, refunds, and voids.",
          tags: ["operation", "reason", "template", "setup"],
          scribeEmbed: "https://scribehow.com/embed/Reason_Template_Setup__0uN3Lih2THeVtEyVGv4m5w",
          content: `<h2>Overview</h2><p>Reason templates help standardize the reasons staff provide when cancelling, refunding, or voiding orders.</p>
            <h2>Steps</h2>
            <div class="step"><div class="step-num">1</div><div class="step-content"><h4>Go to Reason Templates</h4><p>Navigate to <strong>Settings → Reason Templates</strong>.</p></div></div>
            <div class="step"><div class="step-num">2</div><div class="step-content"><h4>Create Template</h4><p>Click <strong>"+ Add Template"</strong> and enter predefined reasons for each operation type.</p></div></div>`
        }
      ]
    },
    {
      id: "hrm",
      section: "portal",
      name: "HRM",
      icon: "👥",
      color: "#8B5CF6",
      bgColor: "#F5EBFF",
      description: "Employee role setup, permissions management, and team configurations.",
      articles: [
        {
          id: "employee-role-setup",
          title: "Employee Role Setup",
          description: "Create and configure employee roles with the right permissions for your restaurant team.",
          tags: ["hrm", "employee", "role", "permissions"],
          steps: 9,
          duration: "19 seconds",
          scribeEmbed: "https://scribehow.com/embed/Employee_Role_Setup__I3O8r_hfSu2bdihH0ACBgg",
          content: `
            <h2>Overview</h2>
            <p>This guide walks you through creating and configuring employee roles in the FeedMe Portal. Roles define what each team member can access and do within the system.</p>
            <h2>Steps</h2>
            <div class="step">
              <div class="step-num">1</div>
              <div class="step-content">
                <h4>Navigate to HRM Settings</h4>
                <p>In the FeedMe Portal, go to the left sidebar and click on <strong>"HRM"</strong> to expand the HRM menu options.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div class="step-content">
                <h4>Click on "Role Management"</h4>
                <p>Select <strong>"Role Management"</strong> from the HRM submenu to access the role configuration page.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div class="step-content">
                <h4>Create New Role</h4>
                <p>Click the <strong>"+ New Role"</strong> button in the top-right corner to start creating a new employee role.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">4</div>
              <div class="step-content">
                <h4>Set Role Name and Description</h4>
                <p>Enter a descriptive role name (e.g., "Kitchen Staff", "Cashier", "Manager") and an optional description.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">5</div>
              <div class="step-content">
                <h4>Configure Permissions</h4>
                <p>Toggle on the specific permissions for this role — control access to Menu, Orders, Reports, Settings, and other modules.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">6</div>
              <div class="step-content">
                <h4>Save the Role</h4>
                <p>Click <strong>"Save"</strong> to create the role. You can now assign it to employees in the Employee Management section.</p>
              </div>
            </div>
          `
        },
        {
          id: "employee-pin-setup",
          title: "Employee PIN Setup",
          description: "Set up employee PINs for secure access to the POS system.",
          tags: ["hrm", "employee", "pin", "security"],
          scribeEmbed: "https://scribehow.com/embed/Employee_PIN_Setup__i64ZSSlYQ5CjbQmrbebdvg",
          content: `
            <h2>Overview</h2>
            <p>This guide shows you how to set up and manage employee PINs for POS system access control.</p>
            <h2>Steps</h2>
            <div class="step">
              <div class="step-num">1</div>
              <div class="step-content">
                <h4>Go to Employee Management</h4>
                <p>Navigate to <strong>HRM → Employee</strong> in the FeedMe Portal.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div class="step-content">
                <h4>Select Employee</h4>
                <p>Click on the employee you want to set a PIN for.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div class="step-content">
                <h4>Set PIN</h4>
                <p>Enter a unique PIN code for the employee. This PIN will be used to log in to the POS system.</p>
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: "integration-setup",
      section: "integration",
      name: "Integration Setup",
      icon: "🔌",
      color: "#10B981",
      bgColor: "#ECFDF5",
      description: "E-invoicing and accounting software integration setup guides.",
      articles: [
        {
          id: "e-invoice-setup",
          title: "E-Invoice Introduction & Setup Guide",
          description: "Complete guide to Malaysia e-invoicing with FeedMe — setup, integration flow, cancellation rules, and submission records.",
          tags: ["integration", "e-invoice", "einvoice", "myinvois", "lhdn", "tax"],
          scribeEmbed: "https://scribehow.com/embed/_FeedMe_E-Invoice_Introduction_Setup_Guide__JNbhkVxKQ0uihIFbYe83hg",
          content: `
            <h2>Overview</h2>
            <p>This guide covers the complete FeedMe e-invoice integration with Malaysia's MyInvois system. It explains how to set up your account, understand the types of e-invoices, and manage submissions.</p>

            <div class="info-box" style="background:#EBF5FF;border-left:4px solid #3B82F6;padding:16px;border-radius:8px;margin:16px 0;">
              <p style="margin:0;"><strong>📌 Note:</strong> Invoice over RM10k is compulsory to claim as individual submission (effective starting 1st Jan 2026).</p>
            </div>

            <h2>Step 1 — Add FeedMe as Intermediary in MyInvois Portal</h2>
            <p>Ensure you have added FeedMe as intermediary and granted all necessary permissions with the following details:</p>
            <table style="width:100%;border-collapse:collapse;margin:12px 0;max-width:500px;">
              <tr><td style="padding:8px;border:1px solid #E5E7EB;font-weight:bold;">TIN</td><td style="padding:8px;border:1px solid #E5E7EB;">C25817841080</td></tr>
              <tr><td style="padding:8px;border:1px solid #E5E7EB;font-weight:bold;">BRN</td><td style="padding:8px;border:1px solid #E5E7EB;">201801046117</td></tr>
              <tr><td style="padding:8px;border:1px solid #E5E7EB;font-weight:bold;">Taxpayer Name</td><td style="padding:8px;border:1px solid #E5E7EB;">FEEDME POS SDN. BHD.</td></tr>
            </table>
            <p><a href="https://scribehow.com/viewer/How_to_Access_MyInvois_on_MyTax__XjtXLm5GQk6FStB7tltsBw" target="_blank" rel="noopener">📖 How to Add FeedMe as Intermediary in MyInvois Portal →</a></p>

            <h2>Step 2 — Setup E-Invoice Profile in FeedMe Portal</h2>
            <div class="step">
              <div class="step-num">1</div>
              <div class="step-content">
                <h4>Configure E-Invoice Settings</h4>
                <p>Ensure you have added e-invoice for restaurants, marketing store, and exempted tax reason.</p>
                <p><a href="https://scribehow.com/viewer/Update_E-Invoice_Settings_and_Profile_Information__E7Is_Z7OTcyNEeCH4KDp0Q" target="_blank" rel="noopener">📖 How to Setup E-Invoice Profile in FeedMe Portal →</a></p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div class="step-content">
                <h4>Request Activation</h4>
                <p>Notify your FeedMe Account Manager in the WhatsApp group for test submission and activation.</p>
                <p><a href="https://scribehow.com/viewer/Feedme_activate_einvoice__fg22Hw3tTAy9miymLrhZzQ" target="_blank" rel="noopener">📖 How to Identify if FeedMe Successfully Activated E-Invoice →</a></p>
              </div>
            </div>

            <h2>Things to Know</h2>
            <h3>Involved Parties</h3>
            <ul>
              <li><strong>Merchant</strong> — as Taxpayer</li>
              <li><strong>Customer</strong> — as Buyer</li>
              <li><strong>FeedMe</strong> — as Intermediary (helps merchant submit invoice)</li>
              <li><strong>MyInvois</strong> — Platform to store submitted invoices</li>
              <li><strong>MyTax</strong> — Platform for tax information and MyInvois access</li>
            </ul>

            <h3>Types of E-Invoices</h3>
            <ul>
              <li><strong>Individual e-invoice</strong> — Contains both supplier and customer details. Customers must claim for tax within the same month. After consolidated, merchants can reject late claims. E-invoices mainly serve as a validation mechanism; income/expense recognition follows existing accounting standards.</li>
              <li><strong>Consolidated e-invoice</strong> — Contains only supplier details. Unclaimed invoices are grouped and must be submitted within 7 days after month-end (e.g., August sales by 7th September). FeedMe will auto-submit starting the 2nd day of the following month. If submission fails, the system retries and sends email reminders until the 7-day deadline.</li>
            </ul>

            <h3>Cancel (Void) or Resubmit E-Invoice</h3>
            <div class="info-box" style="background:#FEF2F2;border-left:4px solid #EF4444;padding:16px;border-radius:8px;margin:16px 0;">
              <p><strong>⚠️ MyInvois allows cancellation only within 72 hours</strong> of validation. After that, amendments can only be made via refund note, credit note, or debit note.</p>
            </div>
            <h4>Individual Submission Cancellation</h4>
            <ul>
              <li><strong>Customer (Buyer):</strong> Must cancel the claim in MyInvois. Once the merchant approves, customer can rescan the FeedMe Receipt QR and refresh the claim link to resubmit.</li>
              <li><strong>Merchant (Taxpayer):</strong> Can directly cancel an individual e-invoice in MyInvois.</li>
            </ul>
            <h4>Consolidated Submission Cancellation</h4>
            <ul>
              <li><strong>FeedMe Portal:</strong> Does <strong>NOT</strong> support cancellation of consolidated submissions.</li>
              <li><strong>Merchant (Taxpayer):</strong> Can cancel consolidated e-invoices in MyInvois. However, the cancellation <strong>WILL NOT SYNC BACK</strong> to FeedMe.</li>
            </ul>

            <h2>Integration Flow</h2>
            <ol>
              <li>FeedMe acts as an intermediary for merchants to sync and submit consolidated e-invoices within <strong>7 calendar days</strong> after month-end to MyInvois.</li>
              <li>E-invoices record sales on the day — draft bills not yet checked out will still be sent. <strong>Checkout bills on the same day they are issued.</strong></li>
              <li>End users can submit individual e-invoice claims by scanning the QR code on FeedMe Receipts (POS v7+).</li>
              <li>Consolidated e-invoice submission runs after month-end, starting from the <strong>2nd of each month at 1:00 AM</strong>.</li>
              <li>If draft bills are found, FeedMe will <strong>not submit</strong> for that day and will send an email notification. The system retries daily at 1:00 AM until the 7th of the month.</li>
              <li>If draft bills remain unclosed by the <strong>7th of the month</strong>, the system will submit them based on the recorded amount at that time.</li>
              <li>Failed consolidated submissions trigger an email reminder to your restaurant email.</li>
              <li>For errors discovered after 72 hours, email <strong>support@feedme.com</strong> for resubmission assistance.</li>
            </ol>

            <h3>Third-Party Integrated Invoice Exclusions</h3>
            <div class="info-box" style="background:#FEF3C7;border-left:4px solid #F59E0B;padding:16px;border-radius:8px;margin:16px 0;">
              <h4 style="margin-top:0;">Delivery Integration Order (DPI) Exclusion</h4>
              <p>DPI orders are excluded from FeedMe sales submission because sales are already generated by the delivery platform. This applies to order numbers with prefixes like <strong>"GF", "SPF", "FP"</strong>, etc.</p>
              <p><strong>⚠️ Warning:</strong> If tables are named "Grab Food" etc., they will NOT be filtered and may cause duplicate submissions. Remove these tables and enable the delivery platform feature instead.</p>
            </div>

            <h3>FeedMe Express (FM) Orders</h3>
            <p>For FeedMe Express orders, FeedMe acts as the order provider and the e-invoice will be issued directly by FeedMe to the end user.</p>

            <h3>Payout Account Settled Amount</h3>
            <ul>
              <li><strong>Online Transactions:</strong> FeedMe will issue an e-invoice to the merchant for online transaction fees.</li>
              <li><strong>Offline Transactions with FeedMe:</strong> FeedMe will issue an e-invoice to the merchant.</li>
              <li><strong>Offline Transactions with Fiuu Payment Gateway:</strong> Fiuu will issue an e-invoice directly to the merchant.</li>
            </ul>

            <h2>View Submission Records</h2>
            <ul>
              <li><strong>FeedMe Portal:</strong> Check and download e-invoice submission records. <a href="https://scribehow.com/viewer/How_To_Check_and_Download_E-Invoice_From_FeedMe_Portal__T1m96stfREWsXEeAdiI7xg" target="_blank" rel="noopener">Guide →</a></li>
              <li><strong>MyInvois Portal:</strong> View all submissions. Look for channel <strong>Intermediary ERP</strong> and Submitter <strong>C25817841080</strong> to find FeedMe submissions.</li>
            </ul>
          `
        },
        {
          id: "accounting-software-integration",
          title: "Accounting Software Integration",
          description: "Integrate FeedMe with accounting software including AutoCount, SQL, BUKKU, XERO, and BIZTORY.",
          tags: ["integration", "accounting", "bukku", "xero", "biztory", "autocount", "sql"],
          content: `
            <h2>Overview</h2>
            <p>FeedMe integrates with popular accounting software to simplify financial management — reducing manual data entry, improving accuracy, and saving time. Sales data from FeedMe POS flows into your accounting system either via <strong>API (auto-sync)</strong> or <strong>Excel import</strong>.</p>

            <h2>Supported Accounting Software</h2>
            <table style="width:100%;border-collapse:collapse;margin:12px 0;">
              <tr style="background:#F0FDF4;"><th style="text-align:left;padding:10px;border:1px solid #E5E7EB;">Integration Type</th><th style="text-align:left;padding:10px;border:1px solid #E5E7EB;">Software</th></tr>
              <tr><td style="padding:10px;border:1px solid #E5E7EB;"><strong>API Integration</strong> (auto-sync)</td><td style="padding:10px;border:1px solid #E5E7EB;">BUKKU, XERO, BIZTORY</td></tr>
              <tr><td style="padding:10px;border:1px solid #E5E7EB;"><strong>Import Integration</strong> (Excel)</td><td style="padding:10px;border:1px solid #E5E7EB;">AutoCount, SQL</td></tr>
            </table>

            <div class="info-box" style="background:#EBF5FF;border-left:4px solid #3B82F6;padding:16px;border-radius:8px;margin:16px 0;">
              <h4 style="margin-top:0;">📌 Key Technical Details</h4>
              <ul style="margin-bottom:0;">
                <li><strong>Data Capture Period:</strong> Defaults to <strong>12:00 AM – 11:59 PM</strong>. Over-day data is split into two different days based on the bill time.</li>
                <li><strong>Tax Adjustments:</strong> Handles SST/SV and rounding adjustments automatically.</li>
                <li><strong>Grouping Methods:</strong> All integrations support <strong>Group by Day</strong> (daily totals), <strong>Group by Invoice</strong> (per receipt), or <strong>Group by Day &amp; Category</strong> (category-specific sales codes).</li>
              </ul>
            </div>

            <hr style="border:none;border-top:2px solid #E5E7EB;margin:28px 0;">

            <h2>📗 AutoCount Integration (Excel Import)</h2>
            <p>Export sales data from FeedMe and import it into AutoCount via Excel.</p>

            <details style="margin:12px 0;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;">
              <summary style="padding:14px 18px;background:#F9FAFB;cursor:pointer;font-weight:600;">View AutoCount Setup Guide</summary>
              <div style="padding:16px 18px;">
                <h4>Phase 1 — Preparation</h4>
                <p>Obtain the following <strong>Account Codes</strong> from AutoCount:</p>
                <ul>
                  <li>Sales Account Code</li>
                  <li>Debtor Account Code</li>
                  <li>Rounding Account Code</li>
                  <li>Multi-charges (Service Charge, etc.)</li>
                  <li>Discount Account Code</li>
                  <li>Payment Method Codes</li>
                </ul>

                <h4>Phase 2 — Choose Grouping Method</h4>
                <ul>
                  <li><strong>Group by Day:</strong> One invoice per day; payments as separate receipts.</li>
                  <li><strong>Group by Invoice:</strong> Each FeedMe receipt synced as a separate entry.</li>
                  <li><strong>Group by Day &amp; Category:</strong> Daily invoices with products mapped to category-specific sales codes.</li>
                </ul>

                <h4>Phase 3 — Setup in FeedMe Portal</h4>
                <ol>
                  <li>Navigate to <strong>Integration → Add Integration → AutoCount</strong>.</li>
                  <li>Map FeedMe payment methods, taxes, and items to AutoCount account codes.</li>
                  <li>Use the <strong>Preview</strong> page to select a date and verify data.</li>
                  <li>Click <strong>Download</strong> to get the Excel file.</li>
                </ol>

                <h4>Phase 4 — Import into AutoCount</h4>
                <p>Use AutoCount's <strong>"Import from Excel"</strong> menu to upload data for:</p>
                <ul>
                  <li>AR Invoice</li>
                  <li>AR Payment</li>
                  <li>AR Credit Note</li>
                  <li>AR Refund</li>
                </ul>
              </div>
            </details>

            <hr style="border:none;border-top:2px solid #E5E7EB;margin:28px 0;">

            <h2>📘 SQL Accounting Integration (Excel Import)</h2>
            <p>Export sales data using a template recognized by the SQL import program.</p>

            <details style="margin:12px 0;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;">
              <summary style="padding:14px 18px;background:#F9FAFB;cursor:pointer;font-weight:600;">View SQL Setup Guide</summary>
              <div style="padding:16px 18px;">
                <h4>Step 1 — Get Codes</h4>
                <p>Gather codes from SQL for: Sales, Debtor, Rounding, Discounts, and Payment methods.</p>

                <h4>Step 2 — Choose Grouping Strategy</h4>
                <ul>
                  <li><strong>Group by Day</strong> — Daily totals</li>
                  <li><strong>Group by Invoice</strong> — Detailed per-receipt</li>
                  <li><strong>Group by Day and Category</strong> — Category-level breakdown</li>
                </ul>

                <h4>Step 3 — FeedMe Portal Settings</h4>
                <ol>
                  <li>Enter <strong>General</strong> settings (Location and Grouping method).</li>
                  <li>Map <strong>Items</strong>, <strong>Taxes</strong>, and <strong>Payments</strong>.</li>
                  <li>Use the <strong>"+"</strong> icon to add missing payment types if they aren't listed.</li>
                </ol>

                <h4>Step 4 — Export &amp; Import</h4>
                <ol>
                  <li>Download the Excel file from the <strong>Preview</strong> tab.</li>
                  <li>The <code>Doc No</code> field reflects the FeedMe receipt number (if grouping by invoice).</li>
                  <li>Use the SQL import program to complete the process.</li>
                </ol>
              </div>
            </details>

            <hr style="border:none;border-top:2px solid #E5E7EB;margin:28px 0;">

            <h2>📙 BUKKU Integration (API)</h2>
            <p>Automate the transfer of sales, payments, and inventory data directly via API.</p>

            <details style="margin:12px 0;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;">
              <summary style="padding:14px 18px;background:#F9FAFB;cursor:pointer;font-weight:600;">View BUKKU Setup Guide</summary>
              <div style="padding:16px 18px;">
                <h4>Step 1 — Account Mapping</h4>
                <p>Identify codes in BUKKU for: Contact, Sales, Service Charge, Rounding, and Discount Given. Check Tax codes (e.g., SST_SV, SST_EX) under <strong>Company Settings</strong>.</p>

                <h4>Step 2 — API Connection</h4>
                <ol>
                  <li>In BUKKU, go to <strong>Control Panel → Integration</strong> and enable <strong>"API Access"</strong>.</li>
                  <li>Copy the <strong>Token</strong> and <strong>Subdomain</strong>.</li>
                  <li>Paste them into the FeedMe Portal integration settings.</li>
                </ol>

                <h4>Step 3 — Grouping Options</h4>
                <ul>
                  <li>Standard: Group by Day or Group by Invoice</li>
                  <li>Advanced: <strong>Group by Day and Separate Payment</strong> — creates a separate receipt for every individual payment.</li>
                </ul>

                <h4>Step 4 — MyInvois Settings</h4>
                <ul>
                  <li><strong>External:</strong> Set this if e-invoices are already submitted via FeedMe's intermediary (avoids double-submission).</li>
                  <li><strong>Normal/Validate:</strong> Used for consolidated or direct BUKKU-led e-invoice validation.</li>
                </ul>

                <h4>Step 5 — Upload &amp; Verify</h4>
                <ol>
                  <li>Upload via the <strong>Preview</strong> page in FeedMe Portal.</li>
                  <li>Check the notification bell for <strong>"Upload Status"</strong>.</li>
                  <li>Verify records in the BUKKU dashboard.</li>
                </ol>
              </div>
            </details>

            <hr style="border:none;border-top:2px solid #E5E7EB;margin:28px 0;">

            <h2>📕 XERO Integration (API)</h2>
            <p>Automate daily sales, refunds, and payment reconciliation through a direct Xero connection.</p>

            <details style="margin:12px 0;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;">
              <summary style="padding:14px 18px;background:#F9FAFB;cursor:pointer;font-weight:600;">View XERO Setup Guide</summary>
              <div style="padding:16px 18px;">
                <h4>Step 1 — Connection &amp; Authorization</h4>
                <ol>
                  <li>Log in to both <strong>Xero</strong> and <strong>FeedMe</strong>.</li>
                  <li>Authorize FeedMe to access the specific Xero Organization.</li>
                  <li>The <strong>"Connect"</strong> button will turn to <strong>"Disconnect"</strong> upon success.</li>
                </ol>

                <h4>Step 2 — Configuration Toggles</h4>
                <ul>
                  <li><strong>Discount as Item:</strong> ON = discounts appear as separate line items; OFF = discounts reduce unit price.</li>
                  <li><strong>Combine Refund:</strong> ON = 2 invoices per day (Sales + Refunds); OFF = 1 invoice for nett sales.</li>
                  <li><strong>Grouping:</strong> Day, Invoice, or <strong>Invoice Item</strong> (tracks individual product statuses).</li>
                </ul>

                <h4>Step 3 — Auto-Sync Settings</h4>
                <ul>
                  <li>Set a scheduled <strong>Upload Time</strong> (Recommended: <strong>12:30 AM</strong>).</li>
                  <li>Set a <strong>Delay Day</strong> (Recommended: <strong>1 day</strong>).</li>
                </ul>

                <div class="info-box" style="background:#FEF3C7;border-left:4px solid #F59E0B;padding:16px;border-radius:8px;margin:16px 0;">
                  <h4 style="margin-top:0;">⚠️ Stop &amp; Retry Rule</h4>
                  <p>The system will <strong>NOT sync</strong> if it detects a "Draft Bill" (open order) for the target date. It will automatically retry on subsequent days until the bill is closed, then sync all pending days at once.</p>
                  <p style="margin-bottom:0;"><strong>Best Practice:</strong> Ensure all POS orders are closed/settled before the scheduled upload time.</p>
                </div>
              </div>
            </details>
          `
        }
      ]
    },
    {
      id: "troubleshooting",
      section: "troubleshooting",
      name: "Troubleshooting",
      icon: "🔧",
      color: "#F59E0B",
      bgColor: "#FFF6EB",
      description: "Common issues, error solutions, and step-by-step fix guides.",
      articles: [
        {
          id: "printer-troubleshooting",
          title: "Printer Troubleshooting Guide",
          description: "Printer not working? Use this guide to resolve common printer issues. Select the relevant error and follow the steps in order.",
          tags: ["printer", "connection", "network", "LAN"],
          articleIcon: "🖨️",
          articleColor: "#EF4444",
          scribeEmbed: "",
          content: `
            <div class="callout callout-warning">
              <strong>🖨️ Printer not working?</strong> Select the error you're seeing below. Click to expand and follow the steps.
            </div>

            <!-- ========== ACCORDION: Connection Timed Out ========== -->
            <details class="error-accordion" open>
              <summary class="error-accordion-header">
                <div class="error-accordion-icon" style="background: #FEE2E2; color: #DC2626;">⏱️</div>
                <div class="error-accordion-info">
                  <h2>Connection Timed Out / No Route to Host</h2>
                  <p>Printer cannot reach the network — usually a cable or router issue</p>
                </div>
                <span class="error-accordion-chevron">▾</span>
              </summary>
              <div class="error-accordion-body">

                <div class="error-detail-grid">
                  <div class="error-detail-card">
                    <h4>Error Messages</h4>
                    <code>SocketException: Connection timed out, host: 192.168.0.212, port: 9100</code>
                    <code>SocketException: No route to host, address = 192.168.0.212</code>
                  </div>
                  <div class="error-detail-card">
                    <h4>Common Causes</h4>
                    <ul>
                      <li>Loose or faulty <strong>LAN cable</strong></li>
                      <li>Router / switch is <strong>down or not responding</strong></li>
                      <li>Printer <strong>LAN port</strong> is not active</li>
                    </ul>
                  </div>
                </div>

                <div style="display: flex; gap: 12px; margin: 0 0 28px; flex-wrap: wrap;">
                  <img src="images/troubleshooting/error-timed-out.png" alt="Connection timed out error" style="max-width: 260px; border-radius: 12px; border: 1px solid var(--border); box-shadow: var(--shadow-sm);">
                  <img src="images/troubleshooting/error-no-route.png" alt="No route to host error" style="max-width: 300px; border-radius: 12px; border: 1px solid var(--border); box-shadow: var(--shadow-sm);">
                </div>

                <div class="phase-header">
                  <span class="phase-badge">Phase 1</span>
                  <span>Hardware Check</span>
                </div>

                <div class="step">
                  <div class="step-num">1</div>
                  <div class="step-content">
                    <h4>Restart the printer and the router / switch</h4>
                    <p>Power off both devices, wait 10 seconds, then power them back on.</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">2</div>
                  <div class="step-content">
                    <h4>Unplug and replug the LAN cable</h4>
                    <p>Disconnect the LAN cable on <strong>both ends</strong> (printer and router/switch), then reconnect firmly.</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">3</div>
                  <div class="step-content">
                    <h4>Check the LAN port lights on the printer</h4>
                    <p>The light should be <strong>ON and blinking</strong>. If the light is off, try a different LAN cable or port on the switch.</p>
                    <img src="images/troubleshooting/step-lan-port-lights.png" alt="LAN port lights on printer" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                  </div>
                </div>

                <div class="phase-header">
                  <span class="phase-badge">Phase 2</span>
                  <span>Reprint from POS</span>
                </div>

                <div class="step">
                  <div class="step-num">4</div>
                  <div class="step-content">
                    <h4>On the POS, tap the FeedMe Robot icon</h4>
                    <p>Open the FeedMe POS app and tap the <strong>FeedMe Robot</strong> icon (bottom-right corner of the screen).</p>
                    <img src="images/troubleshooting/step-feedme-robot.png" alt="FeedMe Robot icon" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">5</div>
                  <div class="step-content">
                    <h4>Tap the error notification to reprint</h4>
                    <p>If there is a printer failure notification, tap on it to reprint the failed job. If there is <strong>no error notification</strong>, use the manual reprint steps below.</p>
                    <img src="images/troubleshooting/step-notification-panel.png" alt="Printer error notification" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                  </div>
                </div>

                <div class="phase-header">
                  <span class="phase-badge">Alt</span>
                  <span>Manual Reprint (if Robot has no error)</span>
                </div>

                <div class="step">
                  <div class="step-num">1</div>
                  <div class="step-content">
                    <h4>Go to Order Table</h4>
                    <p>Navigate to the <strong>Order Table</strong> view. Then tap the <strong>product quantity</strong> of the item you need to reprint.</p>
                    <img src="images/troubleshooting/step-order-table.png" alt="Order Table view" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">2</div>
                  <div class="step-content">
                    <h4>Tap Send to reprint</h4>
                    <p>Select the item and tap <strong>"Send"</strong> to resend the print job to the printer.</p>
                    <img src="images/troubleshooting/step-send-button.png" alt="Send button" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                  </div>
                </div>

              </div>
            </details>

            <!-- ========== ACCORDION: Connection Refused ========== -->
            <details class="error-accordion">
              <summary class="error-accordion-header">
                <div class="error-accordion-icon" style="background: #FEF3C7; color: #D97706;">🚫</div>
                <div class="error-accordion-info">
                  <h2>Connection Refused (IP Conflict)</h2>
                  <p>Printer IP conflicts with another device — requires IP change</p>
                </div>
                <span class="error-accordion-chevron">▾</span>
              </summary>
              <div class="error-accordion-body">

                <div class="error-detail-grid">
                  <div class="error-detail-card">
                    <h4>Error Message</h4>
                    <code>SocketException: Connection refused, address = 192.168.0.220, port = 63521</code>
                  </div>
                  <div class="error-detail-card">
                    <h4>Why This Happens</h4>
                    <p>The printer IP address is <strong>conflicting</strong> with another device. This usually occurs when the printer was turned off and the router assigned its IP to another device.</p>
                  </div>
                </div>

                <div style="margin: 0 0 28px;">
                  <img src="images/troubleshooting/connection-refused-error.png" alt="Connection refused error" style="max-width: 380px; border-radius: 12px; border: 1px solid var(--border); box-shadow: var(--shadow-sm);">
                </div>

                <div class="phase-header">
                  <span class="phase-badge">Phase 1</span>
                  <span>Connect Printer via USB</span>
                </div>

                <div class="step">
                  <div class="step-num">1</div>
                  <div class="step-content">
                    <h4>Bring the problematic printer to the POS device</h4>
                    <p>Then connect it using <strong>USB</strong>.</p>
                    <ul><li>You may temporarily unplug the cashier printer USB cable and use it.</li></ul>
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">2</div>
                  <div class="step-content">
                    <h4>Tap the navigation button (bottom-left)</h4>
                    <p>On the POS screen, tap the <strong>grid/navigation icon</strong> at the bottom-left corner to open the navigation menu.</p>
                    <img src="images/troubleshooting/step-tap-navigation.png" alt="POS navigation button" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">3</div>
                  <div class="step-content">
                    <h4>Tap Settings → Operation → Printer</h4>
                    <p>Navigate through: <strong>Settings</strong> → <strong>Operation</strong> → <strong>Printer</strong>.</p>
                    <div style="display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap;">
                      <img src="images/troubleshooting/step-tap-settings.png" alt="Settings" style="max-width: 32%; border-radius: 8px; border: 1px solid var(--border);">
                      <img src="images/troubleshooting/step-tap-operation.png" alt="Operation" style="max-width: 32%; border-radius: 8px; border: 1px solid var(--border);">
                      <img src="images/troubleshooting/step-tap-printer.png" alt="Printer" style="max-width: 32%; border-radius: 8px; border: 1px solid var(--border);">
                    </div>
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">4</div>
                  <div class="step-content">
                    <h4>Select the problematic printer</h4>
                    <p>Tap on the printer that is having the connection issue (e.g., <strong>Kitchen</strong>).</p>
                    <img src="images/troubleshooting/step-select-printer.png" alt="Select problematic printer" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">5</div>
                  <div class="step-content">
                    <h4>Tap Search Connection</h4>
                    <p>In the printer details page, scroll to the <strong>Connection</strong> section and tap <strong>"Search Connection"</strong>.</p>
                    <img src="images/troubleshooting/step-search-connection.png" alt="Search Connection button" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">6</div>
                  <div class="step-content">
                    <h4>Select POS-80C or POS80, then tap Connect</h4>
                    <p>In the Printer Connection dialog, select the <strong>Driver</strong> tab. Choose <strong>POS-80C</strong> or <strong>POS80</strong> from the list, then tap <strong>"Connect"</strong>.</p>
                    <img src="images/troubleshooting/step-printer-connection-dialog.png" alt="Printer Connection dialog" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">7</div>
                  <div class="step-content">
                    <h4>Tap Test Print to confirm it is connected</h4>
                    <p>Tap the <strong>"Test Print"</strong> button (top-right corner) to verify the USB connection is working.</p>
                    <img src="images/troubleshooting/step-test-print.png" alt="Test Print button" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                  </div>
                </div>

                <div class="phase-header">
                  <span class="phase-badge">Phase 2</span>
                  <span>Set a New Printer IP Address</span>
                </div>

                <div class="step">
                  <div class="step-num">8</div>
                  <div class="step-content">
                    <h4>Scroll down and tap Set</h4>
                    <p>Scroll down to the <strong>Advance</strong> section. Find <strong>"Custom IP address"</strong> and tap <strong>"Set"</strong>.</p>
                    <img src="images/troubleshooting/step-custom-ip-set.png" alt="Custom IP address Set button" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">9</div>
                  <div class="step-content">
                    <h4>Set a new IP address</h4>
                    <p>We recommend: <strong>previous printer IP + 10</strong>.</p>
                    <ul>
                      <li><code>192.168.1.150</code> → <code>192.168.1.160</code></li>
                      <li><code>192.168.0.200</code> → <code>192.168.0.210</code></li>
                    </ul>
                    <div class="callout callout-info" style="margin-top: 12px;">
                      <strong>IP Rules:</strong> Keep the first three sections the same. Change <strong>only the last number</strong>. Do not exceed <code>.225</code>. Make sure the new IP is not used by another device.
                    </div>
                    <p>Then tap <strong>Save</strong>.</p>
                    <img src="images/troubleshooting/step-custom-ip-dialog.png" alt="Custom IP address dialog" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                  </div>
                </div>

                <div class="phase-header">
                  <span class="phase-badge">Phase 3</span>
                  <span>Reconnect the Printer to the Network</span>
                </div>

                <div class="step">
                  <div class="step-num">10</div>
                  <div class="step-content">
                    <h4>Bring the printer back to its original location</h4>
                    <p>Then:</p>
                    <ol type="a">
                      <li>Power on the printer.</li>
                      <li>Plug in the LAN cable securely.</li>
                      <li>Confirm the LAN port lights are <strong>ON and blinking</strong>.</li>
                    </ol>
                    <img src="images/troubleshooting/step-reconnect-lan.png" alt="Reconnect LAN cable" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">11</div>
                  <div class="step-content">
                    <h4>Connect using the new IP</h4>
                    <p>Go back to the printer settings:</p>
                    <ol type="a">
                      <li>Select <strong>IP</strong>.</li>
                      <li>Choose <strong>Custom</strong>.</li>
                      <li>Enter the <strong>new IP</strong> (from the previous step).</li>
                      <li>Tap <strong>Save</strong>, then <strong>Connect</strong>.</li>
                    </ol>
                    <img src="images/troubleshooting/step-ip-tab-connect.png" alt="IP tab connection" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">12</div>
                  <div class="step-content">
                    <h4>Run Test Print</h4>
                    <p>Tap <strong>"Test Print"</strong> to confirm the connection is working.</p>
                    <img src="images/troubleshooting/step-test-print-final.png" alt="Final Test Print" style="max-width: 100%; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border);">
                    <p><em>If the same error still occurs, repeat the steps and try a different new IP.</em></p>
                  </div>
                </div>

              </div>
            </details>
          `
        }
      ]
    }
  ]
};
