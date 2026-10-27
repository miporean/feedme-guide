// FeedMe Wiki — built-in pages.
//
// Every article uses the same page format as the in-browser editor (see
// js/page-render.js for the text formatting syntax). MIPOS staff can edit any
// of these pages on the site; an edited copy is stored in D1 and shown instead
// of the version here until someone clicks "Restore original".
//
// Section "style": "accordion" = collapsible box (like the Printer guide);
// anything else = plain heading + content.
const SITE_DATA = {
  "siteName": "FeedMe Wiki",
  "siteTagline": "Setup guides, tutorials, and troubleshooting for FeedMe Portal & POS",
  "portalUrl": "https://portal.feedme.com",
  "categories": [
    {
      "id": "menu-setup",
      "section": "portal",
      "name": "Menu Setup",
      "icon": "🍽️",
      "color": "#FF6B35",
      "bgColor": "#FFF0EB",
      "description": "Create products, variants, add-on options, menu schedulers and catalogs for your restaurant.",
      "articles": [
        {
          "id": "create-new-product",
          "title": "How to Create New Product",
          "description": "Learn how to add a new product to your restaurant menu in the FeedMe Portal.",
          "tags": [
            "menu",
            "product",
            "create"
          ],
          "scribeEmbed": "https://scribehow.com/embed/How_to_Create_New_Product__wIqj9T_8QZyDJGBhLXF35g",
          "sections": [
            {
              "title": "Overview",
              "text": "This guide walks you through creating a new product in the FeedMe Portal. Products are the core items displayed on your restaurant menu."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Navigate to Menu Management",
                      "text": "In the FeedMe Portal, go to the left sidebar and click on **\"Menu\"** to expand the menu options."
                    },
                    {
                      "title": "Click \"Create Product\"",
                      "text": "Click the **\"+ Create Product\"** button in the top-right corner of the product list page."
                    },
                    {
                      "title": "Fill in Product Details",
                      "text": "Enter the product name, description, price, and upload a product image. Set the category and any applicable tags."
                    },
                    {
                      "title": "Save and Publish",
                      "text": "Review your product details and click **\"Save\"**. Toggle the publish switch to make it visible on your menu."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "create-variant",
          "title": "How to Create Variant",
          "description": "Set up product variants like sizes, flavors, or other options for your menu items.",
          "tags": [
            "menu",
            "variant",
            "product"
          ],
          "scribeEmbed": "https://scribehow.com/embed/How_to_Variant__9Pn01DdPTl2MyUK1GIl8HQ",
          "sections": [
            {
              "title": "Overview",
              "text": "Variants allow you to offer different options for a product, such as sizes (Small, Medium, Large) or flavors."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Go to the Product",
                      "text": "Navigate to **Menu → Products** and click on the product you want to add variants to."
                    },
                    {
                      "title": "Open Variant Settings",
                      "text": "Scroll down to the **\"Variants\"** section and click **\"+ Add Variant Group\"**."
                    },
                    {
                      "title": "Configure Variant Options",
                      "text": "Enter the variant group name (e.g., \"Size\"), then add each option with its name and price adjustment."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "edit-product",
          "title": "How to Edit Product",
          "description": "Update product details, pricing, images, and availability settings.",
          "tags": [
            "menu",
            "product",
            "edit"
          ],
          "scribeEmbed": "https://scribehow.com/embed/How_to_Edit_Product__GmJapbynTqmO5IwGf56QwQ",
          "sections": [
            {
              "title": "Overview",
              "text": "This guide shows you how to edit existing products in your FeedMe menu."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Find the Product",
                      "text": "Go to **Menu → Products** and locate the product you want to edit. You can use the search bar to find it quickly."
                    },
                    {
                      "title": "Edit Details",
                      "text": "Click on the product to open its details. Modify the name, description, price, image, or any other fields as needed."
                    },
                    {
                      "title": "Save Changes",
                      "text": "Click **\"Save\"** to apply your changes. The updates will be reflected immediately on your menu."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "create-addon-options",
          "title": "How to Create Add-on Options",
          "description": "Set up add-on options that customers can select when ordering items.",
          "tags": [
            "menu",
            "addon",
            "options"
          ],
          "scribeEmbed": "https://scribehow.com/embed/How_to_Create_Add-on_Options__fSm52nMiQw2FKAggRlJ9jQ",
          "sections": [
            {
              "title": "Overview",
              "text": "Add-on options allow customers to customize their orders with extras like toppings, sides, or special requests."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Navigate to Add-on Settings",
                      "text": "Go to **Menu → Add-on Options** in the FeedMe Portal sidebar."
                    },
                    {
                      "title": "Create Add-on Group",
                      "text": "Click **\"+ Create Add-on Group\"**. Enter a group name (e.g., \"Extra Toppings\") and set selection rules (min/max selections)."
                    },
                    {
                      "title": "Add Items to Group",
                      "text": "Add individual add-on items with their names and prices. Toggle availability as needed."
                    },
                    {
                      "title": "Link to Products",
                      "text": "Assign the add-on group to specific products so customers can see these options when ordering."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "create-menu-scheduler",
          "title": "How to Create Menu Scheduler",
          "description": "Schedule when specific menu items or categories are available for ordering.",
          "tags": [
            "menu",
            "scheduler",
            "availability"
          ],
          "scribeEmbed": "https://scribehow.com/embed/How_to_Create_Menu_Scheduler__GQqDdRD8Scyfevw_pnGkqQ",
          "sections": [
            {
              "title": "Overview",
              "text": "The Menu Scheduler lets you control when certain items appear on your menu — perfect for breakfast, lunch, dinner, or special promotions."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Go to Menu Scheduler",
                      "text": "Navigate to **Menu → Scheduler** in the FeedMe Portal."
                    },
                    {
                      "title": "Create New Schedule",
                      "text": "Click **\"+ New Schedule\"**. Set the schedule name, days of the week, and time range."
                    },
                    {
                      "title": "Assign Menu Items",
                      "text": "Select which products or categories should follow this schedule. Items will only be visible during the scheduled time."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "create-catalog",
          "title": "How to Create Catalog",
          "description": "Organize your menu items into catalogs for better structure and presentation.",
          "tags": [
            "menu",
            "catalog",
            "organize"
          ],
          "scribeEmbed": "https://scribehow.com/embed/How_to_Create_Catalog__fi13bbz8SluIDFbXubHJyQ",
          "sections": [
            {
              "title": "Overview",
              "text": "Catalogs help you organize your menu into logical groups, making it easier for customers to browse and order."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Navigate to Catalog",
                      "text": "Go to **Menu → Catalog** in the portal sidebar."
                    },
                    {
                      "title": "Create New Catalog",
                      "text": "Click **\"+ Create Catalog\"**. Enter a name, description, and optionally upload a cover image."
                    },
                    {
                      "title": "Add Products",
                      "text": "Drag and drop or select products to include in this catalog. Arrange them in your preferred display order."
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "connect-setup",
      "section": "portal",
      "name": "Connect Setup",
      "icon": "🔗",
      "color": "#4A6CF7",
      "bgColor": "#EBF0FF",
      "description": "Promotions, vouchers, broadcasts, memberships, loyalty programs and reward campaigns.",
      "articles": [
        {
          "id": "promotion-item-discount",
          "title": "Create Promotion Campaign (Item Discount)",
          "description": "Set up item-level discount promotions to attract more customers.",
          "tags": [
            "connect",
            "promotion",
            "discount",
            "item"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Create_Promotion_Campaign_Item_Discount__aUiVym5MRSq3mFuVHGChjQ",
          "sections": [
            {
              "title": "Overview",
              "text": "Item discount promotions allow you to offer discounts on specific menu items. This guide shows you how to create and configure one in the FeedMe Portal."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Go to Connect → Promotions",
                      "text": "Navigate to the **Connect** section and click on **Promotions**."
                    },
                    {
                      "title": "Create New Promotion",
                      "text": "Click **\"+ Create Promotion\"** and select **\"Item Discount\"** as the type."
                    },
                    {
                      "title": "Configure Discount",
                      "text": "Set the discount amount (percentage or fixed), select applicable items, and define the promotion period."
                    },
                    {
                      "title": "Activate",
                      "text": "Review and click **\"Publish\"** to make the promotion live."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "promotion-bill-discount",
          "title": "Create Promotion Campaign (Bill Discount)",
          "description": "Create bill-level discount promotions for entire orders.",
          "tags": [
            "connect",
            "promotion",
            "discount",
            "bill"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Create_Promotion_Campaign_Bill_Discount__vbhxHdq2R7mAcumN6nRcDA",
          "sections": [
            {
              "title": "Overview",
              "text": "Bill discount promotions apply discounts to the entire order total, encouraging higher spending."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Go to Connect → Promotions",
                      "text": "Navigate to **Connect → Promotions**."
                    },
                    {
                      "title": "Create Bill Discount",
                      "text": "Click **\"+ Create Promotion\"** and select **\"Bill Discount\"** type."
                    },
                    {
                      "title": "Set Conditions",
                      "text": "Define minimum order amount, discount value, and the campaign duration."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "voucher-campaign-bill",
          "title": "Create Voucher Campaign (Bill Discount)",
          "description": "Generate voucher codes that provide bill-level discounts.",
          "tags": [
            "connect",
            "voucher",
            "discount",
            "bill"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Create_Voucher_Campaign_Bill_Discount__ieHwgXdOTRSQGLRhIFQpIA",
          "sections": [
            {
              "title": "Overview",
              "text": "Voucher campaigns let you generate redeemable codes for bill discounts."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Navigate to Vouchers",
                      "text": "Go to **Connect → Vouchers**."
                    },
                    {
                      "title": "Create Voucher Campaign",
                      "text": "Click **\"+ Create Voucher\"** and select **\"Bill Discount\"**."
                    },
                    {
                      "title": "Configure and Generate",
                      "text": "Set the discount value, usage limits, validity period, and generate voucher codes."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "voucher-code-campaign",
          "title": "Create Voucher Code Campaign",
          "description": "Create custom voucher codes for marketing campaigns and customer rewards.",
          "tags": [
            "connect",
            "voucher",
            "code",
            "campaign"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Create_a_Voucher_Code__jDYZkUUwSmiJVhqb3RR8wA",
          "sections": [
            {
              "title": "Overview",
              "text": "Custom voucher codes can be used for targeted marketing campaigns."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Go to Voucher Codes",
                      "text": "Navigate to **Connect → Voucher Codes**."
                    },
                    {
                      "title": "Create Campaign",
                      "text": "Click **\"+ Create Campaign\"**, enter the campaign name and set a custom voucher code prefix."
                    },
                    {
                      "title": "Set Rules and Publish",
                      "text": "Define redemption rules, expiry date, and usage limits. Click **\"Publish\"** to activate."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "broadcast-campaign",
          "title": "Create Broadcast Campaign",
          "description": "Send targeted broadcast messages to your customer base.",
          "tags": [
            "connect",
            "broadcast",
            "marketing",
            "message"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Create_Broadcast_Campaign__0H2HgNLERSaacY_6NHyWDQ",
          "sections": [
            {
              "title": "Overview",
              "text": "Broadcast campaigns allow you to send push notifications or messages to your customers."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Navigate to Broadcasts",
                      "text": "Go to **Connect → Broadcast**."
                    },
                    {
                      "title": "Create New Broadcast",
                      "text": "Click **\"+ Create Broadcast\"**. Choose your target audience and message type."
                    },
                    {
                      "title": "Compose and Send",
                      "text": "Write your broadcast message, attach any images or promotions, and schedule or send immediately."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "membership-tiers",
          "title": "Create Membership Tiers and Experience",
          "description": "Set up membership levels with tiered benefits and rewards for loyal customers.",
          "tags": [
            "connect",
            "membership",
            "tiers",
            "loyalty"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Create_Membership_Tiers_and_Experience__DdW_kmhzR4e86bm3csIGyA",
          "sections": [
            {
              "title": "Overview",
              "text": "Membership tiers create a loyalty hierarchy for your customers with escalating benefits."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Go to Membership",
                      "text": "Navigate to **Connect → Membership**."
                    },
                    {
                      "title": "Create Tiers",
                      "text": "Define tier names (e.g., Silver, Gold, Platinum), point thresholds, and benefits for each level."
                    },
                    {
                      "title": "Configure Experience",
                      "text": "Set up the customer experience — how points are earned, what rewards are unlocked at each tier."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "create-title",
          "title": "Create Title",
          "description": "Create customer titles and badges for your loyalty program.",
          "tags": [
            "connect",
            "title",
            "badge",
            "loyalty"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Create_Title__IRlggo-tTTGk0ZcHT930yA",
          "sections": [
            {
              "title": "Overview",
              "text": "Titles are special badges or labels assigned to customers based on their activity or membership level."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Navigate to Titles",
                      "text": "Go to **Connect → Titles**."
                    },
                    {
                      "title": "Create New Title",
                      "text": "Click **\"+ Create Title\"**, set the title name, icon, and criteria for earning it."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "point-program",
          "title": "Create Point Program",
          "description": "Set up a points-based loyalty program for customer retention.",
          "tags": [
            "connect",
            "points",
            "loyalty",
            "rewards"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Create_Point_Campaign__hlvcCc0fTDaNjU1szlXBJQ",
          "sections": [
            {
              "title": "Overview",
              "text": "A point program rewards customers with points for every purchase, which can be redeemed for discounts or free items."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Go to Point Program",
                      "text": "Navigate to **Connect → Point Program**."
                    },
                    {
                      "title": "Configure Earning Rules",
                      "text": "Set how many points customers earn per RM spent (e.g., RM1 = 1 point)."
                    },
                    {
                      "title": "Set Redemption Options",
                      "text": "Define what rewards can be redeemed with points and the point values required."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "cashback-program",
          "title": "Create Cashback Program",
          "description": "Offer cashback rewards to encourage repeat purchases.",
          "tags": [
            "connect",
            "cashback",
            "rewards"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Create_Cashback_Program__m9X_b_eXTSCqWC_JVS5ekg",
          "sections": [
            {
              "title": "Overview",
              "text": "Cashback programs return a percentage of the purchase amount as store credit."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Navigate to Cashback",
                      "text": "Go to **Connect → Cashback**."
                    },
                    {
                      "title": "Create Cashback Program",
                      "text": "Set the cashback percentage, minimum spend requirement, and expiry period for the cashback credit."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "spin-win-game",
          "title": "Create a Spin and Win Game Program",
          "description": "Create an interactive spin-the-wheel game for customer engagement.",
          "tags": [
            "connect",
            "game",
            "spin",
            "engagement"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Create_a_Spin_and_Win_Game_Program__nVX091WFS8GWVSZ8F8ixGw",
          "sections": [
            {
              "title": "Overview",
              "text": "Spin and Win games are gamified promotions that let customers spin a wheel for prizes."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Go to Games",
                      "text": "Navigate to **Connect → Games → Spin and Win**."
                    },
                    {
                      "title": "Configure the Wheel",
                      "text": "Add prize segments, set win probabilities, and customize the wheel appearance."
                    },
                    {
                      "title": "Set Participation Rules",
                      "text": "Define how customers can earn spins (e.g., per purchase, membership action)."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "mission-program",
          "title": "Create Mission Program",
          "description": "Set up mission-based challenges for customers to complete and earn rewards.",
          "tags": [
            "connect",
            "mission",
            "challenge",
            "engagement"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Create_Mission_Program__4twUqx_bS9-iRa8M_7KZ5w",
          "sections": [
            {
              "title": "Overview",
              "text": "Mission programs challenge customers to complete specific actions in exchange for rewards."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Navigate to Missions",
                      "text": "Go to **Connect → Missions**."
                    },
                    {
                      "title": "Create Mission",
                      "text": "Define the mission name, required actions (e.g., \"Order 5 times\"), and the reward for completion."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "points-redeem-reward",
          "title": "Create Points Redeem Reward",
          "description": "Set up rewards that customers can redeem using their loyalty points.",
          "tags": [
            "connect",
            "points",
            "redeem",
            "reward"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Create_Points_Redeem_Reward__4oyDIS7fQGGDSXXtLsqfwQ",
          "sections": [
            {
              "title": "Overview",
              "text": "Points Redeem Rewards are items or discounts customers can exchange their accumulated points for."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Go to Redeem Rewards",
                      "text": "Navigate to **Connect → Point Program → Redeem Rewards**."
                    },
                    {
                      "title": "Create Reward",
                      "text": "Click **\"+ Create Reward\"**. Set the reward type (item, discount, or voucher), points required, and availability period."
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "restaurant-operation",
      "section": "portal",
      "name": "Restaurant Operation",
      "icon": "🏪",
      "color": "#22C55E",
      "bgColor": "#EBFFF4",
      "description": "Day-to-day restaurant operations, order management, and workflow guides.",
      "articles": [
        {
          "id": "service-charge-setup",
          "title": "Service Charge Setup",
          "description": "Configure service charge rates and rules for your restaurant.",
          "tags": [
            "operation",
            "service-charge",
            "setup"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Service_Charge_Setup__KzPBr2GwRhGhLFu5-TrlBQ",
          "sections": [
            {
              "title": "Overview",
              "text": "This guide shows you how to configure service charge settings for your restaurant in the FeedMe Portal."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Navigate to Settings",
                      "text": "Go to **Settings → Service Charge** in the FeedMe Portal."
                    },
                    {
                      "title": "Configure Rate",
                      "text": "Set the service charge percentage and configure when it should be applied."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "table-setup",
          "title": "Table Setup",
          "description": "Configure your restaurant's table layout and QR ordering setup.",
          "tags": [
            "operation",
            "table",
            "setup",
            "qr"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Tables_Setup__0Z5Z1aYvQqKGNjFJV0eMtw",
          "sections": [
            {
              "title": "Overview",
              "text": "Set up your restaurant's table layout for dine-in ordering and QR code generation."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Navigate to Table Setup",
                      "text": "Go to **Operations → Table Setup**."
                    },
                    {
                      "title": "Add Tables",
                      "text": "Click **\"+ Add Table\"** to create tables. Set table numbers, seating capacity, and section assignments."
                    },
                    {
                      "title": "Generate QR Codes",
                      "text": "Click **\"Generate QR\"** for each table to create unique QR codes for customer ordering."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "reason-template-setup",
          "title": "Reason Template Setup",
          "description": "Create predefined reason templates for order cancellations, refunds, and voids.",
          "tags": [
            "operation",
            "reason",
            "template",
            "setup"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Reason_Template_Setup__0uN3Lih2THeVtEyVGv4m5w",
          "sections": [
            {
              "title": "Overview",
              "text": "Reason templates help standardize the reasons staff provide when cancelling, refunding, or voiding orders."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Go to Reason Templates",
                      "text": "Navigate to **Settings → Reason Templates**."
                    },
                    {
                      "title": "Create Template",
                      "text": "Click **\"+ Add Template\"** and enter predefined reasons for each operation type."
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "hrm",
      "section": "portal",
      "name": "HRM",
      "icon": "👥",
      "color": "#8B5CF6",
      "bgColor": "#F5EBFF",
      "description": "Employee role setup, permissions management, and team configurations.",
      "articles": [
        {
          "id": "employee-role-setup",
          "title": "Employee Role Setup",
          "description": "Create and configure employee roles with the right permissions for your restaurant team.",
          "tags": [
            "hrm",
            "employee",
            "role",
            "permissions"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Employee_Role_Setup__I3O8r_hfSu2bdihH0ACBgg",
          "steps": 9,
          "duration": "19 seconds",
          "sections": [
            {
              "title": "Overview",
              "text": "This guide walks you through creating and configuring employee roles in the FeedMe Portal. Roles define what each team member can access and do within the system."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Navigate to HRM Settings",
                      "text": "In the FeedMe Portal, go to the left sidebar and click on **\"HRM\"** to expand the HRM menu options."
                    },
                    {
                      "title": "Click on \"Role Management\"",
                      "text": "Select **\"Role Management\"** from the HRM submenu to access the role configuration page."
                    },
                    {
                      "title": "Create New Role",
                      "text": "Click the **\"+ New Role\"** button in the top-right corner to start creating a new employee role."
                    },
                    {
                      "title": "Set Role Name and Description",
                      "text": "Enter a descriptive role name (e.g., \"Kitchen Staff\", \"Cashier\", \"Manager\") and an optional description."
                    },
                    {
                      "title": "Configure Permissions",
                      "text": "Toggle on the specific permissions for this role — control access to Menu, Orders, Reports, Settings, and other modules."
                    },
                    {
                      "title": "Save the Role",
                      "text": "Click **\"Save\"** to create the role. You can now assign it to employees in the Employee Management section."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "employee-pin-setup",
          "title": "Employee PIN Setup",
          "description": "Set up employee PINs for secure access to the POS system.",
          "tags": [
            "hrm",
            "employee",
            "pin",
            "security"
          ],
          "scribeEmbed": "https://scribehow.com/embed/Employee_PIN_Setup__i64ZSSlYQ5CjbQmrbebdvg",
          "sections": [
            {
              "title": "Overview",
              "text": "This guide shows you how to set up and manage employee PINs for POS system access control."
            },
            {
              "title": "Steps",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Go to Employee Management",
                      "text": "Navigate to **HRM → Employee** in the FeedMe Portal."
                    },
                    {
                      "title": "Select Employee",
                      "text": "Click on the employee you want to set a PIN for."
                    },
                    {
                      "title": "Set PIN",
                      "text": "Enter a unique PIN code for the employee. This PIN will be used to log in to the POS system."
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "pos-setup",
      "section": "pos",
      "name": "POS Guides",
      "icon": "📱",
      "color": "#4A6CF7",
      "bgColor": "#EEF2FF",
      "description": "FeedMe POS setup and usage guides.",
      "articles": []
    },
    {
      "id": "integration-setup",
      "section": "integration",
      "name": "Integration Setup",
      "icon": "🔌",
      "color": "#10B981",
      "bgColor": "#ECFDF5",
      "description": "E-invoicing and accounting software integration setup guides.",
      "articles": [
        {
          "id": "e-invoice-setup",
          "title": "E-Invoice Introduction & Setup Guide",
          "description": "Complete guide to Malaysia e-invoicing with FeedMe — setup, integration flow, cancellation rules, and submission records.",
          "tags": [
            "integration",
            "e-invoice",
            "einvoice",
            "myinvois",
            "lhdn",
            "tax"
          ],
          "scribeEmbed": "https://scribehow.com/embed/_FeedMe_E-Invoice_Introduction_Setup_Guide__JNbhkVxKQ0uihIFbYe83hg",
          "sections": [
            {
              "title": "Overview",
              "text": "This guide covers the complete FeedMe e-invoice integration with Malaysia's MyInvois system. It explains how to set up your account, understand the types of e-invoices, and manage submissions.\n\n> **📌 Note:** Invoice over RM10k is compulsory to claim as individual submission (effective starting 1st Jan 2026)."
            },
            {
              "title": "Step 1 — Add FeedMe as Intermediary in MyInvois Portal",
              "text": "Ensure you have added FeedMe as intermediary and granted all necessary permissions with the following details:\n\n| **TIN** | C25817841080 |\n| **BRN** | 201801046117 |\n| **Taxpayer Name** | FEEDME POS SDN. BHD. |\n\n[📖 How to Add FeedMe as Intermediary in MyInvois Portal →](https://scribehow.com/viewer/How_to_Access_MyInvois_on_MyTax__XjtXLm5GQk6FStB7tltsBw)"
            },
            {
              "title": "Step 2 — Setup E-Invoice Profile in FeedMe Portal",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Configure E-Invoice Settings",
                      "text": "Ensure you have added e-invoice for restaurants, marketing store, and exempted tax reason.\n\n[📖 How to Setup E-Invoice Profile in FeedMe Portal →](https://scribehow.com/viewer/Update_E-Invoice_Settings_and_Profile_Information__E7Is_Z7OTcyNEeCH4KDp0Q)"
                    },
                    {
                      "title": "Request Activation",
                      "text": "Notify your FeedMe Account Manager in the WhatsApp group for test submission and activation.\n\n[📖 How to Identify if FeedMe Successfully Activated E-Invoice →](https://scribehow.com/viewer/Feedme_activate_einvoice__fg22Hw3tTAy9miymLrhZzQ)"
                    }
                  ]
                }
              ]
            },
            {
              "title": "Things to Know",
              "text": "### Involved Parties\n\n- **Merchant** — as Taxpayer\n- **Customer** — as Buyer\n- **FeedMe** — as Intermediary (helps merchant submit invoice)\n- **MyInvois** — Platform to store submitted invoices\n- **MyTax** — Platform for tax information and MyInvois access\n\n### Types of E-Invoices\n\n- **Individual e-invoice** — Contains both supplier and customer details. Customers must claim for tax within the same month. After consolidated, merchants can reject late claims. E-invoices mainly serve as a validation mechanism; income/expense recognition follows existing accounting standards.\n- **Consolidated e-invoice** — Contains only supplier details. Unclaimed invoices are grouped and must be submitted within 7 days after month-end (e.g., August sales by 7th September). FeedMe will auto-submit starting the 2nd day of the following month. If submission fails, the system retries and sends email reminders until the 7-day deadline.\n\n### Cancel (Void) or Resubmit E-Invoice\n\n!! **⚠️ MyInvois allows cancellation only within 72 hours** of validation. After that, amendments can only be made via refund note, credit note, or debit note.\n\n#### Individual Submission Cancellation\n\n- **Customer (Buyer):** Must cancel the claim in MyInvois. Once the merchant approves, customer can rescan the FeedMe Receipt QR and refresh the claim link to resubmit.\n- **Merchant (Taxpayer):** Can directly cancel an individual e-invoice in MyInvois.\n\n#### Consolidated Submission Cancellation\n\n- **FeedMe Portal:** Does **NOT** support cancellation of consolidated submissions.\n- **Merchant (Taxpayer):** Can cancel consolidated e-invoices in MyInvois. However, the cancellation **WILL NOT SYNC BACK** to FeedMe."
            },
            {
              "title": "Integration Flow",
              "text": "1. FeedMe acts as an intermediary for merchants to sync and submit consolidated e-invoices within **7 calendar days** after month-end to MyInvois.\n2. E-invoices record sales on the day — draft bills not yet checked out will still be sent. **Checkout bills on the same day they are issued.**\n3. End users can submit individual e-invoice claims by scanning the QR code on FeedMe Receipts (POS v7+).\n4. Consolidated e-invoice submission runs after month-end, starting from the **2nd of each month at 1:00 AM**.\n5. If draft bills are found, FeedMe will **not submit** for that day and will send an email notification. The system retries daily at 1:00 AM until the 7th of the month.\n6. If draft bills remain unclosed by the **7th of the month**, the system will submit them based on the recorded amount at that time.\n7. Failed consolidated submissions trigger an email reminder to your restaurant email.\n8. For errors discovered after 72 hours, email **support@feedme.com** for resubmission assistance.\n\n### Third-Party Integrated Invoice Exclusions\n\n! **Delivery Integration Order (DPI) Exclusion**\n!\n! DPI orders are excluded from FeedMe sales submission because sales are already generated by the delivery platform. This applies to order numbers with prefixes like **\"GF\", \"SPF\", \"FP\"**, etc.\n!\n! **⚠️ Warning:** If tables are named \"Grab Food\" etc., they will NOT be filtered and may cause duplicate submissions. Remove these tables and enable the delivery platform feature instead.\n\n### FeedMe Express (FM) Orders\n\nFor FeedMe Express orders, FeedMe acts as the order provider and the e-invoice will be issued directly by FeedMe to the end user.\n\n### Payout Account Settled Amount\n\n- **Online Transactions:** FeedMe will issue an e-invoice to the merchant for online transaction fees.\n- **Offline Transactions with FeedMe:** FeedMe will issue an e-invoice to the merchant.\n- **Offline Transactions with Fiuu Payment Gateway:** Fiuu will issue an e-invoice directly to the merchant."
            },
            {
              "title": "View Submission Records",
              "text": "- **FeedMe Portal:** Check and download e-invoice submission records. [Guide →](https://scribehow.com/viewer/How_To_Check_and_Download_E-Invoice_From_FeedMe_Portal__T1m96stfREWsXEeAdiI7xg)\n- **MyInvois Portal:** View all submissions. Look for channel **Intermediary ERP** and Submitter **C25817841080** to find FeedMe submissions."
            }
          ]
        },
        {
          "id": "autocount-integration",
          "title": "AutoCount Accounting Integration",
          "description": "Export FeedMe sales data and import into AutoCount via Excel — with step-by-step mapping and import guide.",
          "tags": [
            "integration",
            "accounting",
            "autocount",
            "excel",
            "import"
          ],
          "sections": [
            {
              "title": "Overview",
              "text": "Simplify your accounting tasks by exporting sales data from FeedMe POS and importing it into **AutoCount** using Excel templates. This integration uses the **Excel Import** method.\n\n> **📌 Key Info**\n>\n> - **Integration Type:** Excel Import (manual download & import)\n> - **Data Capture:** 12:00 AM – 11:59 PM daily. Over-day data splits by bill time.\n> - **Tax Adjustments:** SST/SV and rounding handled automatically."
            },
            {
              "title": "Step 1 — Obtain Account Codes",
              "text": "Gather the following **Account Codes** from your AutoCount software before starting:\n\n| Code Type | Description |\n|---|---|\n| Sales Account Code | Revenue account for sales transactions |\n| Debtor Account Code | Accounts receivable / debtor code |\n| Rounding Account Code | For rounding adjustments |\n| Multi-charges | Service Charge, etc. |\n| Discount Account Code | For discount entries |\n| Payment Method Codes | Cash, Credit Card, E-Wallet, etc. |"
            },
            {
              "title": "Step 2 — Choose Grouping Method",
              "text": "Decide how sales data should be grouped when exported:",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Group by Day",
                      "text": "One invoice per day. Payments are created as separate receipts. Best for simple daily summaries."
                    },
                    {
                      "title": "Group by Invoice",
                      "text": "Every single FeedMe receipt is synced as an individual entry. Best for detailed transaction tracking."
                    },
                    {
                      "title": "Group by Day & Category",
                      "text": "Daily invoices with products mapped to category-specific sales codes (e.g., Food vs. Beverages pointing to different accounts)."
                    }
                  ],
                  "letters": true
                }
              ]
            },
            {
              "title": "Step 3 — Setup in FeedMe Portal",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Add Integration",
                      "text": "In FeedMe Portal, go to **Integration → Add Integration** and select **AutoCount** from the App dropdown. Enter a name for this integration.",
                      "images": [
                        "img/autocount_add_integration.png"
                      ]
                    },
                    {
                      "title": "Configure General Settings",
                      "text": "Select your **Location** and preferred **Grouping Method** from the General tab.",
                      "images": [
                        "img/autocount_general_settings.png"
                      ]
                    },
                    {
                      "title": "Map Account Codes",
                      "text": "Map your AutoCount account codes to FeedMe categories:\n\n- **Items:** Sales, Discount, Service Charge account codes\n- **Taxes:** SST_SV, SST_EX, and other tax codes\n- **Payments:** Cash, Credit Card, FoodPanda, GrabFood, DuitNow, etc.",
                      "images": [
                        "img/autocount_mapping.png"
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "title": "Step 4 — Preview & Export",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Preview Data",
                      "text": "Go to the **Preview** tab, select a date range, and verify the data looks correct. The table shows columns for Date, Doc No, Item Account, Tax Code, and amounts.\n\n*Note: When using \"Group by Day\", the Doc No is displayed by date.*",
                      "images": [
                        "img/autocount_preview.png"
                      ]
                    },
                    {
                      "title": "Download Excel File",
                      "text": "Click the **Download** button to export the Excel file. The file contains separate sheets for **AR Invoice** and **AR Payment**.",
                      "images": [
                        "img/autocount_import_excel.png"
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "title": "Step 5 — Import into AutoCount",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Import Excel Files",
                      "text": "In AutoCount, go to **File → Import and Export → Import from Excel** and import the following:\n\n- **Import A/R Invoice** — Sales invoices\n- **Import A/R Payment** — Payment receipts\n- **Import A/R Credit Note** — Refunds/credits\n- **Import A/R Refund** — Refund entries",
                      "images": [
                        "img/autocount_import_menu.png"
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "sql-integration",
          "title": "SQL Accounting Integration",
          "description": "Export FeedMe sales data and import into SQL Accounting via Excel templates — with mapping and import guide.",
          "tags": [
            "integration",
            "accounting",
            "sql",
            "excel",
            "import"
          ],
          "sections": [
            {
              "title": "Overview",
              "text": "Simplify your accounting by exporting sales data from FeedMe POS using Excel templates recognized by the **SQL Accounting** import program.\n\n> **📌 Key Info**\n>\n> - **Integration Type:** Excel Import (manual download & import)\n> - **Data Capture:** 12:00 AM – 11:59 PM daily.\n> - **Tax Adjustments:** SST/SV and rounding handled automatically."
            },
            {
              "title": "Step 1 — Obtain Account Codes",
              "text": "Gather the following codes from your SQL Accounting software:\n\n- Sales Account Code\n- Debtor Account Code\n- Rounding Account Code\n- Multi-charges (Service Charge, etc.)\n- Discount Account Code\n- Payment Method Codes (Cash, Credit Card, E-Wallet, etc.)"
            },
            {
              "title": "Step 2 — Choose Grouping Method",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Group by Day",
                      "text": "One invoice per day with separate receipts for each payment type."
                    },
                    {
                      "title": "Group by Invoice",
                      "text": "Every receipt synced as an individual entry for detailed tracking."
                    },
                    {
                      "title": "Group by Day & Category",
                      "text": "Daily invoices categorized by product types to different sales codes."
                    }
                  ],
                  "letters": true
                }
              ]
            },
            {
              "title": "Step 3 — Setup in FeedMe Portal",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Add Integration",
                      "text": "In FeedMe Portal, go to **Integration → Add Integration** and select **SQL** from the App dropdown.",
                      "images": [
                        "img/sql_add_integration.png"
                      ]
                    },
                    {
                      "title": "Create Initial Record",
                      "text": "Click **\"Update\"** once to create the record, which will then reveal the mapping fields."
                    },
                    {
                      "title": "Configure General Settings",
                      "text": "Enter the integration **Name**, select your **Location**, choose the **Grouping Method**, and enter the **Debtor Code**."
                    },
                    {
                      "title": "Map Account Codes",
                      "text": "Input the relevant codes for:\n\n- **Items:** Discount, Sales account codes\n- **Taxes:** SST_SV, SST_EX codes\n- **Payments:** Cash, FeedMe, DuitNow, Credit Card, FoodPanda, GrabFood, etc.\n\n> 💡 **Tip:** Use the **refresh icon** to repopulate mapping fields. Use the **\"+\"** icon to manually add payment methods if they are not listed.",
                      "images": [
                        "img/sql_general_settings.png"
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "title": "Step 4 — Preview & Export",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Preview & Download",
                      "text": "Go to the **Preview** page, select your date range, verify the data, and click the **Download** button.\n\n*Note: The `Doc No` field will reflect the FeedMe receipt number when grouping by invoice (e.g., IV-1303).*",
                      "images": [
                        "img/sql_preview.png"
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "title": "Step 5 — Import into SQL",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Import via SQL Program",
                      "text": "Use the SQL **\"XLS n MDB Import\"** program to upload the downloaded Excel files:\n\n- Navigate to **Maintain Customer → Customer Invoice → Customer Payment**\n- Import the AR Invoice and AR Payment data",
                      "images": [
                        "img/sql_import.png"
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "bukku-integration",
          "title": "BUKKU Accounting Integration (API)",
          "description": "Automate sales data sync from FeedMe to BUKKU via API — with account mapping, MyInvois settings, and upload guide.",
          "tags": [
            "integration",
            "accounting",
            "bukku",
            "api",
            "auto-sync"
          ],
          "sections": [
            {
              "title": "Overview",
              "text": "Automate the transfer of sales, payments, and inventory data from FeedMe POS directly to **BUKKU** via API integration. This eliminates manual data entry and minimizes errors.\n\n> **📌 Key Info**\n>\n> - **Integration Type:** API (automatic sync)\n> - **Data Capture:** 12:00 AM – 11:59 PM daily.\n> - **Tax Adjustments:** SST/SV and rounding handled automatically."
            },
            {
              "title": "Step 1 — Obtain BUKKU Account Codes",
              "text": "From your BUKKU Chart of Accounts, gather codes for:\n\n| Account | Purpose |\n|---|---|\n| Contact (Customer) | Customer/debtor account |\n| Sales | Revenue account |\n| Service Charge | Service charge account |\n| Rounding | Rounding adjustments |\n| Discount Allowed | Discount entries |\n\nAlso check **Tax Codes** (e.g., SST_SV, SST_EX) under **Company Settings**."
            },
            {
              "title": "Step 2 — Get BUKKU API Access",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Enable API Access",
                      "text": "In BUKKU, go to **Control Panel → Integration** and switch on **\"API Access\"**.",
                      "images": [
                        "img/bukku_api_access.png"
                      ]
                    },
                    {
                      "title": "Copy Credentials",
                      "text": "Copy the **Access Token** and **Subdomain** displayed on the integration page."
                    }
                  ]
                }
              ]
            },
            {
              "title": "Step 3 — Setup in FeedMe Portal",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Add BUKKU Integration",
                      "text": "In FeedMe Portal, go to **Integration → Add Integration**, select **Bukku**, and paste your **Subdomain** and **Token**."
                    },
                    {
                      "title": "Choose Grouping Method",
                      "text": "Select your preferred grouping:\n\n- **Group by Day** — Daily totals\n- **Group by Invoice** — Per-receipt detail\n- **Group by Day and Item** — Item-level daily breakdown\n- **Group by Day and Separate Payment** — Creates a separate receipt for every individual payment"
                    },
                    {
                      "title": "Configure MyInvois Settings",
                      "text": "Set the **MyInvois Action** based on your e-invoice setup:\n\n| Setting | When to Use |\n|---|---|\n| **External** | E-invoices are already submitted via FeedMe's intermediary — avoids double-submission in BUKKU. |\n| **Normal** | For consolidated invoices submitted through BUKKU. |\n| **Validate** | Direct BUKKU-led e-invoice validation. |",
                      "images": [
                        "img/bukku_myinvois.png"
                      ]
                    },
                    {
                      "title": "Map Account Codes",
                      "text": "Map your BUKKU account codes to FeedMe Items, Taxes, and Payments. Use the **\"+\"** icon to add missing payment methods (e.g., FoodPanda, Credit).",
                      "images": [
                        "img/bukku_mapping.png"
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "title": "Step 4 — Upload & Verify",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Upload Data",
                      "text": "Go to the **Preview** page, select the date, and click **Upload** to sync data directly to BUKKU.",
                      "images": [
                        "img/bukku_upload.png"
                      ]
                    },
                    {
                      "title": "Check Status",
                      "text": "A notification will appear in the top right of FeedMe Portal — check the **notification bell** for **\"Upload Status\"** to confirm success. Then verify records in the BUKKU dashboard."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "xero-integration",
          "title": "Xero Accounting Integration (API)",
          "description": "Automate daily sales and refund sync from FeedMe to Xero — with OAuth connection, auto-sync, and Stop & Retry logic.",
          "tags": [
            "integration",
            "accounting",
            "xero",
            "api",
            "auto-sync"
          ],
          "sections": [
            {
              "title": "Overview",
              "text": "Automate daily sales, refunds, and payment reconciliation from FeedMe POS to **Xero** through a direct API connection. Includes a specialized **Stop & Retry** rule for data integrity.\n\n> **📌 Key Info**\n>\n> - **Integration Type:** API (automatic sync)\n> - **Data Capture:** 12:00 AM – 11:59 PM daily.\n> - **Auto-Sync:** Supports scheduled daily uploads."
            },
            {
              "title": "Step 1 — Connect & Authorize",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Connect to Xero",
                      "text": "In FeedMe Portal, go to **Integration → Add Integration → Xero** and click the **\"Connect\"** button. You'll be redirected to Xero's authorization page."
                    },
                    {
                      "title": "Authorize Access",
                      "text": "Select your **Xero Organization** and click **\"Allow Access\"**. Once connected, the button will change from \"Connect\" to **\"Disconnect\"**.",
                      "images": [
                        "img/xero_connect.png"
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "title": "Step 2 — General Profile",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Select Location & Contact",
                      "text": "Choose your restaurant **Location** and map the **Contact Name** — this must match an existing AR Customer in Xero."
                    }
                  ]
                }
              ]
            },
            {
              "title": "Step 3 — Configuration",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Configure Toggles",
                      "text": "| Toggle | ON | OFF |\n|---|---|---|\n| **Discount as Item** | Discounts appear as a separate line item | Discounts reduce the unit price of items |\n| **Combine Refund** | 2 invoices per day (Sales + Refunds) | 1 invoice for nett sales |",
                      "images": [
                        "img/xero_toggles.png"
                      ]
                    },
                    {
                      "title": "Choose Grouping Method",
                      "text": "- **Group by Day** — Daily totals\n- **Group by Invoice** — Per-receipt detail\n- **Group by Invoice Item** — Tracks individual product statuses"
                    },
                    {
                      "title": "Map Chart of Accounts",
                      "text": "Map GL codes for **Items** (Sales, Service Charge), **Payments**, and **Taxes** to your Xero Chart of Accounts."
                    }
                  ]
                }
              ]
            },
            {
              "title": "Step 4 — Auto-Sync Setup",
              "phases": [
                {
                  "steps": [
                    {
                      "title": "Enable Auto Upload",
                      "text": "Enable automated daily sync with the recommended settings:\n\n- **Upload Time:** 12:30 AM (recommended)\n- **Delay Day:** 1 day (recommended) — syncs yesterday's data",
                      "images": [
                        "img/xero_auto_upload.png"
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "text": "! **⚠️ Stop & Retry Rule**\n!\n! The system will **NOT sync** if it detects a **\"Draft Bill\"** (open/unsettled order) in Xero for the target date. This prevents duplicate or conflicting data.\n!\n! - It will automatically **retry** on subsequent days until the bill is closed.\n! - Once the bill is settled, it will **sync all pending days at once**.\n! - **Best Practice:** Ensure all POS orders are closed/settled before the scheduled upload time."
            }
          ]
        }
      ]
    },
    {
      "id": "troubleshooting",
      "section": "troubleshooting",
      "name": "Troubleshooting",
      "icon": "🔧",
      "color": "#F59E0B",
      "bgColor": "#FFF6EB",
      "description": "Common issues, error solutions, and step-by-step fix guides.",
      "articles": [
        {
          "id": "printer-troubleshooting",
          "title": "Printer Troubleshooting Guide",
          "description": "Printer not working? Use this guide to resolve common printer issues. Select the relevant error and follow the steps in order.",
          "tags": [
            "printer",
            "connection",
            "network",
            "LAN"
          ],
          "icon": "🖨️",
          "color": "#EF4444",
          "intro": "**🖨️ Printer not working?** Select the error you're seeing below. Click to expand and follow the steps.",
          "sections": [
            {
              "style": "accordion",
              "title": "Connection Timed Out / No Route to Host",
              "subtitle": "Printer cannot reach the network — usually a cable or router issue",
              "icon": "⏱️",
              "tone": "red",
              "errors": [
                "SocketException: Connection timed out, host: 192.168.0.212, port: 9100",
                "SocketException: No route to host, address = 192.168.0.212"
              ],
              "causes": [
                "Loose or faulty **LAN cable**",
                "Router / switch is **down or not responding**",
                "Printer **LAN port** is not active"
              ],
              "images": [
                "images/troubleshooting/error-timed-out.png",
                "images/troubleshooting/error-no-route.png"
              ],
              "phases": [
                {
                  "label": "Phase 1",
                  "title": "Hardware Check",
                  "steps": [
                    {
                      "title": "Restart the printer and the router / switch",
                      "text": "Power off both devices, wait 10 seconds, then power them back on."
                    },
                    {
                      "title": "Unplug and replug the LAN cable",
                      "text": "Disconnect the LAN cable on **both ends** (printer and router/switch), then reconnect firmly."
                    },
                    {
                      "title": "Check the LAN port lights on the printer",
                      "text": "The light should be **ON and blinking**. If the light is off, try a different LAN cable or port on the switch.",
                      "images": [
                        "images/troubleshooting/step-lan-port-lights.png"
                      ]
                    }
                  ]
                },
                {
                  "label": "Phase 2",
                  "title": "Reprint from POS",
                  "steps": [
                    {
                      "title": "On the POS, tap the FeedMe Robot icon",
                      "text": "Open the FeedMe POS app and tap the **FeedMe Robot** icon (bottom-right corner of the screen).",
                      "images": [
                        "images/troubleshooting/step-feedme-robot.png"
                      ]
                    },
                    {
                      "title": "Tap the error notification to reprint",
                      "text": "If there is a printer failure notification, tap on it to reprint the failed job. If there is **no error notification**, use the manual reprint steps below.",
                      "images": [
                        "images/troubleshooting/step-notification-panel.png"
                      ]
                    }
                  ]
                },
                {
                  "label": "Alt",
                  "title": "Manual Reprint (if Robot has no error)",
                  "restart": true,
                  "steps": [
                    {
                      "title": "Go to Order Table",
                      "text": "Navigate to the **Order Table** view. Then tap the **product quantity** of the item you need to reprint.",
                      "images": [
                        "images/troubleshooting/step-order-table.png"
                      ]
                    },
                    {
                      "title": "Tap Send to reprint",
                      "text": "Select the item and tap **\"Send\"** to resend the print job to the printer.",
                      "images": [
                        "images/troubleshooting/step-send-button.png"
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "style": "accordion",
              "title": "Connection Refused (IP Conflict)",
              "subtitle": "Printer IP conflicts with another device — requires IP change",
              "icon": "🚫",
              "tone": "amber",
              "errors": [
                "SocketException: Connection refused, address = 192.168.0.220, port = 63521"
              ],
              "causes": [
                "The printer IP address is **conflicting** with another device. This usually occurs when the printer was turned off and the router assigned its IP to another device."
              ],
              "causesTitle": "Why This Happens",
              "images": [
                "images/troubleshooting/connection-refused-error.png"
              ],
              "phases": [
                {
                  "label": "Phase 1",
                  "title": "Connect Printer via USB",
                  "steps": [
                    {
                      "title": "Bring the problematic printer to the POS device",
                      "text": "Then connect it using **USB**.\n\n- You may temporarily unplug the cashier printer USB cable and use it."
                    },
                    {
                      "title": "Tap the navigation button (bottom-left)",
                      "text": "On the POS screen, tap the **grid/navigation icon** at the bottom-left corner to open the navigation menu.",
                      "images": [
                        "images/troubleshooting/step-tap-navigation.png"
                      ]
                    },
                    {
                      "title": "Tap Settings → Operation → Printer",
                      "text": "Navigate through: **Settings** → **Operation** → **Printer**.",
                      "images": [
                        "images/troubleshooting/step-tap-settings.png",
                        "images/troubleshooting/step-tap-operation.png",
                        "images/troubleshooting/step-tap-printer.png"
                      ]
                    },
                    {
                      "title": "Select the problematic printer",
                      "text": "Tap on the printer that is having the connection issue (e.g., **Kitchen**).",
                      "images": [
                        "images/troubleshooting/step-select-printer.png"
                      ]
                    },
                    {
                      "title": "Tap Search Connection",
                      "text": "In the printer details page, scroll to the **Connection** section and tap **\"Search Connection\"**.",
                      "images": [
                        "images/troubleshooting/step-search-connection.png"
                      ]
                    },
                    {
                      "title": "Select POS-80C or POS80, then tap Connect",
                      "text": "In the Printer Connection dialog, select the **Driver** tab. Choose **POS-80C** or **POS80** from the list, then tap **\"Connect\"**.",
                      "images": [
                        "images/troubleshooting/step-printer-connection-dialog.png"
                      ]
                    },
                    {
                      "title": "Tap Test Print to confirm it is connected",
                      "text": "Tap the **\"Test Print\"** button (top-right corner) to verify the USB connection is working.",
                      "images": [
                        "images/troubleshooting/step-test-print.png"
                      ]
                    }
                  ]
                },
                {
                  "label": "Phase 2",
                  "title": "Set a New Printer IP Address",
                  "steps": [
                    {
                      "title": "Scroll down and tap Set",
                      "text": "Scroll down to the **Advance** section. Find **\"Custom IP address\"** and tap **\"Set\"**.",
                      "images": [
                        "images/troubleshooting/step-custom-ip-set.png"
                      ]
                    },
                    {
                      "title": "Set a new IP address",
                      "text": "We recommend: **previous printer IP + 10**.\n\n- `192.168.1.150` → `192.168.1.160`\n- `192.168.0.200` → `192.168.0.210`\n\nThen tap **Save**.",
                      "note": "**IP Rules:** Keep the first three sections the same. Change **only the last number**. Do not exceed `.225`. Make sure the new IP is not used by another device.",
                      "images": [
                        "images/troubleshooting/step-custom-ip-dialog.png"
                      ]
                    }
                  ]
                },
                {
                  "label": "Phase 3",
                  "title": "Reconnect the Printer to the Network",
                  "steps": [
                    {
                      "title": "Bring the printer back to its original location",
                      "text": "Then:\n\na. Power on the printer.\nb. Plug in the LAN cable securely.\nc. Confirm the LAN port lights are **ON and blinking**.",
                      "images": [
                        "images/troubleshooting/step-reconnect-lan.png"
                      ]
                    },
                    {
                      "title": "Connect using the new IP",
                      "text": "Go back to the printer settings:\n\na. Select **IP**.\nb. Choose **Custom**.\nc. Enter the **new IP** (from the previous step).\nd. Tap **Save**, then **Connect**.",
                      "images": [
                        "images/troubleshooting/step-ip-tab-connect.png"
                      ]
                    },
                    {
                      "title": "Run Test Print",
                      "text": "Tap **\"Test Print\"** to confirm the connection is working.\n\n*If the same error still occurs, repeat the steps and try a different new IP.*",
                      "images": [
                        "images/troubleshooting/step-test-print-final.png"
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
