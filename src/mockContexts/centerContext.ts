import { AllCenterType, CenterType } from "@/apis/interfaces";
import React, { Component } from "react";

export const mockCenterContext = {
  address: {
    city: {
      cityId: "Visakhapatnam",
    },
  },
  centerServiceId: 215,
  id: "20418",
  locality: "Dwaraka Nagar",
  name: "a1b2",
  category: null,
  partnerCenterType: CenterType.GYM,
  seller: {
    mercatusSellerId: "CULT_PASS-220828",
  },
  type: AllCenterType.GOLD,
  tenantID: null,
  playCenterId: null,
};
