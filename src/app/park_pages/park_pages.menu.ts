export const PARK_PAGES_MENU = [
    {
      path: 'park_pages',
      children: [
        {
          path: 'monitor',
          data: {
            menu: {
              title: 'park.menu.monitor',
              icon: 'ion-ios-location-outline',
              selected: false,
              expanded: false,
              order: 100,
            }
          },
          children: [
            {
              path: 'singleParkMap',
              data: {
                menu: {
                  title: 'park.menu.singleParkMap',
                }
              }
            },
            {
              path: 'parkMap',
              data: {
                menu: {
                  title: 'park.menu.parkMap',
                }
              }
            },
            {
              path: 'tollMap',
              data: {
                menu: {
                  title: 'park.menu.tollMap',
                }
              }
            }
          ]
        },
        {
          path: 'road_park',
          data: {
            menu: {
              title: 'park.menu.road_park',
              icon: 'ion-gear-a',
              selected: false,
              expanded: false,
              order: 0
            }
          }
        },
        {
          path: 'public_park',
          data: {
            menu: {
              title: 'park.menu.public_park',
              icon: 'ion-gear-a',
              selected: false,
              expanded: false,
              order: 0
            }
          }
        },
        {
          path: 'appertaining_park',
          data: {
            menu: {
              title: 'park.menu.appertaining_park',
              icon: 'ion-gear-a',
              selected: false,
              expanded: false,
              order: 0
            }
          }
        },
        {
          path: 'charge',
          data: {
            menu: {
              title: 'park.menu.charge',
              icon: 'ion-compose',
              selected: false,
              expanded: false,
              order: 400,
            }
          }
        },
        {
          path: 'dashboard',
          data: {
            menu: {
              title: 'park.menu.dashboard',
              icon: 'ion-android-home',
              selected: false,
              expanded: false,
              order: 0
            }
          }
        },
        {
          path: 'flow',
          data: {
            menu: {
              title: 'park.menu.flow',
              icon: 'ion-stats-bars',
              selected: false,
              expanded: false,
              order: 250,
            }
          },
          children: [
            {
              path: 'parking_flow',
              data: {
                menu: {
                  title: 'park.menu.parking_flow',
                }
              }
            },
            {
              path: 'order_flow',
              data: {
                menu: {
                  title: 'park.menu.order_flow',
                }
              }
            }
          ]
        },
        {
          path: 'systemManage',
          data: {
            menu: {
              title: 'park.menu.systemManage',
              icon: 'ion-android-laptop',
              selected: false,
              expanded: false,
              order: 800
            }
          },
          children: [
            {
              path: 'orgManage',
              data: {
                menu: {
                  title: 'park.menu.orgManage',
                }
              }
            }]
        },
        /*       {
         path: 'carManage',
         data: {
         menu: {
         title: 'park.menu.carManage',
         icon: 'ion-model-s',
         selected: false,
         expanded: false,
         order: 200,
         }
         },
         children: [
         {
         path: 'ownerInformation',
         data: {
         menu: {
         title: 'park.menu.car_ownerInformation',
         }
         }
         },
         {
         path: 'information',
         data: {
         menu: {
         title: 'park.menu.car_information',
         }
         }
         },
         {
         path: 'verifyChange',
         data: {
         menu: {
         title: 'park.menu.car_verifyChange',
         }
         }
         },
         {
         path: 'monthlyPayment',
         data: {
         menu: {
         title: 'park.menu.car_monthlyPayment',
         }
         }
         },
         {
         path: 'topUp',
         data: {
         menu: {
         title: 'park.menu.car_topUp',
         }
         }
         },
         {
         path: 'monthlyPaymentDetail',
         data: {
         menu: {
         title: 'park.menu.car_monthlyPaymentDetail',
         }
         }
         },
         {
         path: 'monthlyPaymentCollect',
         data: {
         menu: {
         title: 'park.menu.car_monthlyPaymentCollect',
         }
         }
         },
         {
         path: 'topUpDetail',
         data: {
         menu: {
         title: 'park.menu.car_topUpDetail',
         }
         }
         },
         {
         path: 'topUpCollect',
         data: {
         menu: {
         title: 'park.menu.car_topUpCollect',
         }
         }
         }
         ]
         },
         {
         path: 'statisticAnalysisOfData',
         data: {
         menu: {
         title: 'park.menu.statisticAnalysisOfData',
         icon: 'ion-arrow-graph-up-right',
         selected: false,
         expanded: false,
         order: 300,
         }
         }
         },
         {
         path: 'businessStatistics',
         data: {
         menu: {
         title: 'park.menu.businessStatistics',
         icon: 'ion-grid',
         selected: false,
         expanded: false,
         order: 500,
         }
         }
         },
         {
         path: 'financialStatistics',
         data: {
         menu: {
         title: 'park.menu.financialStatistics',
         icon: 'ion-ios-pulse',
         selected: false,
         expanded: false,
         order: 600,
         }
         }
         },
         {
         path: 'billManage',
         data: {
         menu: {
         title: 'park.menu.billManage',
         icon: 'ion-document',
         selected: false,
         expanded: false,
         order: 650,
         }
         }
         },
         {
         path: 'electronicPayment',
         data: {
         menu: {
         title: 'park.menu.electronicPayment',
         icon: 'ion-ios-cart-outline',
         selected: false,
         expanded: false,
         order: 700,
         }
         }
         },*/
      ]
    }
  ]
;
