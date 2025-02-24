import { LPplus_part3 } from "./LPplus_part3";

export const applyRequiredQuestions = true;

export const SurveySuffix = {
  Adults: 'Adults',
  Kids: 'Kids'
}

export const surveyCategoryNames = {
  Chronicflow: 'Chronicflow',
  Feverflow: 'Feverflow',
  EMflow: 'EMflow',
  Standardflow: 'Standardflow',
  T3: 'T3',
  T6: 'T6',
  T9: 'T9',
  T12: 'T12',
}


// MH create list of postalcodes for NGM flag
export const postalCodesForNMGStudy = ['3771', '3772', '3773', '3774', '3775', '3794', '3901', '3902', '3903', '3904', '3905', '3906', '3907', '3911', '3912', '3921', '3922', '3925',
  '3927', '3931', '3947', '3953', '3956', '3958', '3959', '3961', '3962', '4001', '4002', '4003', '4004', '4005', '4006', '4007', '4011', '4012',
  '4013', '4014', '4016', '4017', '4021', '4023', '4024', '4031', '4032', '4033', '4041', '4043', '4051', '4053', '4054', '4061', '4062', '4063',
  '4064', '4115', '4116', '4117', '4119', '4182', '4184', '4185', '4191', '4194', '4197', '5213', '5215', '5216', '5231', '5232', '5233', '5235',
  '5236', '5241', '5242', '5243', '5244', '5245', '5246', '5247', '5248', '5249', '5258', '5271', '5272', '5275', '5292', '5327', '5328', '5331',
  '5333', '5334', '5335', '5341', '5342', '5343', '5344', '5345', '5346', '5347', '5348', '5349', '5351', '5361', '5363', '5364', '5366', '5367',
  '5368', '5371', '5373', '5374', '5375', '5381', '5382', '5383', '5384', '5386', '5388', '5391', '5392', '5394', '5395', '5396', '5397', '5398',
  '5401', '5402', '5403', '5404', '5405', '5406', '5408', '5409', '5411', '5421', '5422', '5423', '5424', '5425', '5427', '5428', '5431', '5432',
  '5433', '5434', '5435', '5437', '5438', '5439', '5441', '5443', '5445', '5446', '5447', '5449', '5451', '5453', '5454', '5455', '5461', '5462',
  '5463', '5464', '5465', '5466', '5467', '5469', '5471', '5472', '5473', '5476', '5481', '5482', '5483', '5491', '5492', '5674', '5694', '5701',
  '5702', '5703', '5707', '5708', '5709', '5735', '5737', '5738', '5741', '5751', '5752', '5754', '5761', '5763', '5764', '5801', '5802', '5803',
  '5804', '5807', '5808', '5809', '5811', '5812', '5813', '5814', '5815', '5816', '5817', '5821', '5823', '5824', '5825', '5826', '5827', '5831',
  '5835', '5836', '5841', '5843', '5844', '5845', '5846', '5851', '5853', '5854', '5855', '5856', '5861', '5862', '5863', '5864', '5865', '5866',
  '5871', '5961', '5964', '5966', '6511', '6512', '6515', '6521', '6522', '6523', '6524', '6525', '6531', '6532', '6533', '6534', '6535', '6536',
  '6537', '6538', '6541', '6542', '6543', '6544', '6545', '6546', '6551', '6561', '6562', '6564', '6566', '6571', '6572', '6573', '6574', '6575',
  '6576', '6577', '6578', '6579', '6581', '6582', '6584', '6585', '6586', '6587', '6591', '6595', '6596', '6598', '6599', '6601', '6602', '6603',
  '6604', '6605', '6606', '6611', '6612', '6613', '6615', '6616', '6617', '6621', '6624', '6626', '6627', '6628', '6629', '6631', '6634', '6641',
  '6642', '6644', '6645', '6651', '6652', '6653', '6654', '6655', '6657', '6658', '6659', '6661', '6662', '6663', '6665', '6666', '6668', '6669',
  '6671', '6672', '6673', '6674', '6675', '6676', '6677', '6678', '6681', '6684', '6685', '6686', '6687', '6691', '6701', '6702', '6703', '6704',
  '6705', '6706', '6707', '6708', '6709', '6711', '6712', '6713', '6714', '6715', '6716', '6717', '6718', '6721', '6731', '6732', '6733', '6741',
  '6744', '6745', '6811', '6812', '6813', '6814', '6815', '6816', '6821', '6822', '6823', '6824', '6825', '6826', '6827', '6828', '6831', '6832',
  '6833', '6834', '6835', '6836', '6841', '6842', '6843', '6844', '6845', '6846', '6851', '6852', '6861', '6862', '6865', '6866', '6869', '6871',
  '6874', '6877', '6881', '6882', '6883', '6891', '6901', '6902', '6903', '6904', '6905', '6909', '6911', '6913', '6914', '6915', '6916', '6917',
  '6921', '6922', '6923', '6924', '6931', '6932', '6941', '6942', '6951', '6952', '6953', '6955', '6956', '6957', '6961', '6964', '6971', '6974',
  '6975', '6981', '6982', '6983', '6984', '6986', '6987', '6988', '6991', '6994', '6996', '6997', '6998', '6999', '7001', '7002', '7003', '7004',
  '7005', '7006', '7007', '7008', '7009', '7011', '7021', '7025', '7031', '7035', '7036', '7037', '7038', '7039', '7041', '7044', '7045', '7046',
  '7047', '7048', '7054', '7061', '7064', '7065', '7071', '7075', '7076', '7077', '7078', '7081', '7083', '7084', '7206', '7207', '7221', '7223',
  '7224', '7225', '7226', '7227', '7233', '7234', '7255', '7256', '7333', '7334', '7339', '7348', '7351', '7352', '7361', '7364', '7371', '7381',
  '7382', '7383', '7399']



export const surveyKeys = {
  LPplus_part1: "LPplus_part1",
  LPplus_part3: "LPplus_part3",
  WeeklyTB: "WeeklyTB",
  T0_Invites: "T0_Invites",
  EMflow_Adults: `${surveyCategoryNames.EMflow}_${SurveySuffix.Adults}`,
  EMflow_Kids: `${surveyCategoryNames.EMflow}_${SurveySuffix.Kids}`,
  Feverflow_Adults: `${surveyCategoryNames.Feverflow}_${SurveySuffix.Adults}`,
  Standardflow_Kids: `${surveyCategoryNames.Standardflow}_${SurveySuffix.Kids}`,
  Standardflow_Adults: `${surveyCategoryNames.Standardflow}_${SurveySuffix.Adults}`,
  T3_Kids: `${surveyCategoryNames.T3}_${SurveySuffix.Kids}`,
  T3_Adults: `${surveyCategoryNames.T3}_${SurveySuffix.Adults}`,
  T6_Kids: `${surveyCategoryNames.T6}_${SurveySuffix.Kids}`,
  T6_Adults: `${surveyCategoryNames.T6}_${SurveySuffix.Adults}`,
  T9_Kids: `${surveyCategoryNames.T9}_${SurveySuffix.Kids}`,
  T9_Adults: `${surveyCategoryNames.T9}_${SurveySuffix.Adults}`,
  T12_Kids: `${surveyCategoryNames.T12}_${SurveySuffix.Kids}`,
  T12_Adults: `${surveyCategoryNames.T12}_${SurveySuffix.Adults}`,
  QuitWeeklyTB: 'QuitWeekly',
  QuitFollowUp: 'QuitFU',
  DeleteContactData: 'DelContactData',
}


export const TextBorderFormat = 'border-top border-grey-2 pt-2'
